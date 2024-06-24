'use client'
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function VideoTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [names, setNames] = useState<string[]>([]); // Defina um tipo para o estado names

  async function startVideo() {
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
  }

  useEffect(() => {
    startVideo();
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const handleVideoPlay = async () => {
      const canvas = overlayRef.current;
      const video = videoRef.current;

      if (!canvas || !video) {
        return;
      }

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);

          context.fillStyle = 'white';
          context.font = '24px Arial';

          resizedDetections.forEach((detection, index) => {
            const { x, y, width, height } = detection.box;
            context.fillText(names[index] || 'Nome da pessoa', x, y - 30);
          });
        }
      }, 300);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handleVideoPlay);
    }
  }, [names]);

  useEffect(() => {
    const sendFrameToServer = async (frame : string) => {
      const response = await fetch('http://192.168.1.45:5005/face_coords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_data: frame })
      });
      // const data = [{name:'c0d8'}]

      const data = await response.json();
      // console.log(data);
      // console.log(data.map((d) => d.name));
      
        setNames(data.map((d) => d.name));

        console.log('data');
        console.log(data);
        console.log(names);

  
    };

    const captureFrame = () => {
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
      if (frame) {
        sendFrameToServer(frame);
      }
    }, 2000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <h1 style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, color: 'white', padding: '10px' }}>Teste</h1>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <canvas ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
}
