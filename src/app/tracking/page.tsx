'use client'
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

interface FaceData {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  confidence: number;
}

export default function VideoTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [names, setNames] = useState<string[]>([]);
  const namesRef = useRef<string[]>([]);
  const [detections, setDetections] = useState<faceapi.FaceDetection[]>([]);
  // const imageRef = useRef<HTMLImageElement>(new Image());
  const imageRef = useRef<HTMLImageElement | null>(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.warn('Error accessing back camera, trying default camera:', error);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing default camera:', error);
        alert('Failed to access camera. Please ensure the page is served via HTTPS and camera permissions are granted.');
      }
    }
  };

  useEffect(() => {
    startVideo();
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    };
    loadModels();

    imageRef.current = new Image();
    imageRef.current.src = './img/insta.png';
  }, []);

  useEffect(() => {
    const handleVideoPlay = async () => {
      const canvas = overlayRef.current;
      const video = videoRef.current;
  
      if (!canvas || !video) return;
  
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);
  
      // Carregar a fonte personalizada 'Inter' fora do loop de animação
      const font = new FontFace('Inter', 'url(./fonts/Poppins-LightItalic.ttf)');
      await font.load();
      document.fonts.add(font);
  
      // Carregar imagens de perfil fora do loop de animação
      const imageUrls = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
        // adicione URLs de outras imagens conforme necessário
      ];

     
  
      const images: HTMLImageElement[] = await Promise.all(imageUrls.map((url) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
        });
      }));

      
  
      const defaultImg = new Image();
      defaultImg.src = 'https://randomuser.me/api/portraits/men/3.jpg';
      await new Promise((resolve) => {
        defaultImg.onload = resolve;
      });
  
      const drawDetections = async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Ordenar detecções com base na posição x e y
        resizedDetections.sort((a, b) => {
          return (a.box.x + a.box.y) - (b.box.x + b.box.y);
        });
  
        setDetections(resizedDetections);
  
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
  
          resizedDetections.forEach((detection, index) => {
            const { x, y, width, height } = detection.box;
  
            // Configurar o tamanho da fonte proporcionalmente à altura da caixa de detecção
            const fontSize = height * 0.2; // ajuste o fator conforme necessário
            context.font = `italic ${fontSize}px Inter`;
            context.fillStyle = 'white';
  
            // Calcular o tamanho da imagem proporcionalmente ao tamanho da caixa de detecção
            const imageSize = height * 0.5; // ajuste o fator conforme necessário
            const imageX = x + width + 10; // Posição X da imagem (ajustar margem conforme necessário)
            const imageY = y; // Posição Y da imagem
  
            // Deixar imagem redonda
            context.save();
            context.beginPath();
            context.arc(imageX + imageSize / 2, imageY + imageSize / 2, imageSize / 2, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
  
            const imgToDraw = images[index] || defaultImg;
            context.drawImage(imgToDraw, imageX, imageY, imageSize, imageSize); // Use a imagem correspondente ao usuário

            context.restore();
  
            // Configurar a posição do texto ao lado da imagem
            const textX = imageX + imageSize + 10; // Posição X do texto (ajustar margem conforme necessário)
            const textY = imageY + fontSize * 1.5; // Posição Y do texto
            context.fillText(namesRef.current[index] || 'unknown', textX, textY);
            context.fillText('3.7', textX, textY + fontSize);

            //colocar intervalo de confiança menor ao lado do 3.7
            const text2X = imageX + imageSize + 10; // Posição X do texto (ajustar margem conforme necessário)
            const text2Y = imageY + fontSize * 1.5; // Posição Y do texto
            context.fillText('98%', text2X +40, text2Y + fontSize);
           
            

          });
  
          requestAnimationFrame(drawDetections); // Chama recursivamente para o próximo quadro
        }
      };
  
      requestAnimationFrame(drawDetections);
    };
  
    if (videoRef.current) {
      videoRef.current.addEventListener('play', handleVideoPlay);
    }
  }, [detections]);
  
  useEffect(() => {
    const sendFrameToServer = async (frame: string) => {
      try {
        const response = await axios.post('http://192.168.1.45:5005/face_coords', { image_data: frame });
        response.data.sort((a: FaceData, b: FaceData) => (a.x === b.x ? a.y - b.y : a.x - b.x));
        const extractedNames = response.data.map((item: FaceData) => item.name);
        setNames(extractedNames);
      } catch (error) {
        console.error('Error sending frame to server:', error);
      }
    };

    const captureFrame = (): string | null => {
      const video = videoRef.current;
      if (!video) return null;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (!context) return null;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    };

    const interval = setInterval(() => {
      const frame = captureFrame();
      if (frame) sendFrameToServer(frame);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    namesRef.current = names;
  }, [names]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = overlayRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    const dims = faceapi.matchDimensions(canvas, video, true);
    const resizedResults = faceapi.resizeResults(detections, dims);

    resizedResults.sort((a, b) => (a.box.x === b.box.x ? a.box.y - b.box.y : a.box.x - b.box.x));

    resizedResults.forEach(detection => {
      const { x, y, width, height } = detection.box;
      if (clickX > x && clickX < x + width && clickY > y && clickY < y + height) {
        console.log(`Clicked on face: ${namesRef.current[resizedResults.indexOf(detection)] || 'Unknown'}`);
      }
    });
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }} className="h-screen w-screen">
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <canvas
        ref={overlayRef}
        onClick={handleCanvasClick}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
