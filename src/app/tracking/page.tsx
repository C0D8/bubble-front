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
            const { x, y } = detection.box;
            context.fillText(namesRef.current[index] || '', x, y - 10);
          });
        }
      }, 300);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handleVideoPlay);
    }

    // Adjust canvas size when video is loaded or resized
    // if (videoRef.current) {
    //   videoRef.current.addEventListener('loadedmetadata', () => {
    //     if (overlayRef.current && videoRef.current) {
    //       overlayRef.current.width = videoRef.current.videoWidth;
    //       overlayRef.current.height = videoRef.current.videoHeight;
    //     }
    //   });
    // }
  }, []);

  useEffect(() => {
    const sendFrameToServer = async (frame: string) => {
      try {
        const response = await axios.post('http://localhost:5005/face_coords', { 'image_data' :  frame });
        response.data.sort((a: any, b: any) => {
          if (a.x === b.x) {
            return a.y - b.y;
          }
          return a.x - b.x;
        });

        const extractedNames = response.data.map((item: FaceData)  => item.name);
        setNames(extractedNames);
      } catch (error) {
        console.error('Error sending frame to server:', error);
      }
    };

    const captureFrame = (): string | null => {
      const video = videoRef.current;
      if (!video) {
        console.log('Video not found');
        return null;
      }

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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    namesRef.current = names;
  }, [names]);

  return (
    <div style={{ position: 'relative', width: '100vh', height: '100vh', overflow: 'hidden' }}>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <canvas
  ref={overlayRef}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    height:'100%',
    objectFit: 'cover'
  }}
/>
    </div>
  );
}
