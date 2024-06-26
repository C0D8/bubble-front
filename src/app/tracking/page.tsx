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
  const imageRef = useRef<HTMLImageElement>(new Image());
  // const imageRef = useRef<HTMLImageElement | null>(null);

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

    imageRef.current.src = './img/insta.png';
  }, []);

  useEffect(() => {
    const handleVideoPlay = async () => {
      const canvas = overlayRef.current;
      const video = videoRef.current;
    
      if (!canvas || !video) return;
    
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);
    
      const drawDetections = async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        setDetections(resizedDetections);
    
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
    
          // Carregar a fonte personalizada 'Inter'
          const font = new FontFace('Inter', 'url(./fonts/Poppins-ThinItalic.ttf)');
          font.load().then(loadedFont => {
            document.fonts.add(loadedFont);
    
            // Após a fonte ser carregada, configurar o contexto do canvas
            context.font = 'italic lighter 30px Inter';
            context.fillStyle = 'white';
    
            resizedDetections.forEach((detection, index) => {
              const { x, y } = detection.box;
              context.fillText(namesRef.current[index] || 'unknown', x+detection.box.width, y - 10);
              context.fillText('3.7', x+detection.box.width, y + 20);
    
            });
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
        const response = await axios.post('http://localhost:5005/face_coords', { image_data: frame });
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
