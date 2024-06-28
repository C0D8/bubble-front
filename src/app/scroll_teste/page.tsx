'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CardGridPage: React.FC = () => {
  const [closestCardIndex, setClosestCardIndex] = useState<number | null>(null);

  // Função para calcular a distância euclidiana
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Função para encontrar o card mais próximo do centro visível
  const findClosestCard = (scrollX: number, scrollY: number) => {
    const center = { x: scrollX + window.innerWidth / 2, y: scrollY + window.innerHeight / 2 };
    const cards = Array.from({ length: 100 }, (_, index) => {
      const top = Math.floor(index / 10) * 200;
      const left = (index % 10) * 200;
      return {
        index,
        top,
        left,
        distance: calculateDistance(left + 100, top + 100, center.x, center.y), // +100 para centralizar no card
      };
    });

    const closestCard = cards.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
    setClosestCardIndex(closestCard.index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      findClosestCard(scrollX, scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chama a função inicialmente para definir o card mais próximo do centro

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-[2000px] h-[2000px] overflow-auto">
      {Array.from({ length: 100 }, (_, index) => {
        const top = Math.floor(index / 10) * 200;
        const left = (index % 10) * 200;
        return (
          <Card
            key={index}
            className="absolute w-64 h-64 p-4 m-4"
            style={{
              top: `${top}px`,
              left: `${left}px`,
              backgroundColor: index === closestCardIndex ? 'blue' : 'white',
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" style={{ color: index === closestCardIndex ? 'white' : 'black' }}>
                Card {index + 1}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CardGridPage;
