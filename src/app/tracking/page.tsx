'use client'
import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function VideoTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

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
      // await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      // await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      // load ssd_mobilenetv1
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
        // faceapi.draw.drawDetections(canvas, resizedDetections);
        // colocar o nome da pessoa proximo ao rosto
        context.fillStyle = 'white';
        context.font = '24px Arial';

        resizedDetections.forEach(detection => {
          const { x, y, width, height } = detection.box;
          //desenhar em cima da cabeça
          context.fillText('Nome da pessoa', x, y - 30);
        }
        );
        }
      }, 100);
      
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handleVideoPlay);
    }
  }, [videoRef, overlayRef]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <h1 style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, color: 'white', padding: '10px' }}>Teste</h1>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <canvas ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
}
