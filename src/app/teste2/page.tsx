'use client'
import * as React from 'react';
import { Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css'; // Import the custom CSS file

export default function FloatingActionButtons() {

  const handleRedirect = () => {
    window.location.href = 'https://www.instagram.com/c0d8.zip';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </div>
    ),
  };

  return (
    // Imagem de fundo para a tela
    <div className="bg-gradient-to-b from-gray-600 to-gray-200 h-screen flex flex-col justify-start items-center">
      
      {/* Contêiner para o SlideView */}
      <div className="relative z-10 w-full max-w-xl mx-auto mb-8 h-96"> {/* Ajuste da altura para h-96 */}
        <Slider {...settings} className="custom-slider">
          <div>
            <img src="https://via.placeholder.com/800x400" alt="slide 1" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="https://via.placeholder.com/800x300" alt="slide 2" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="https://via.placeholder.com/800x400" alt="slide 3" className="w-full h-96 object-cover" />
          </div>
        </Slider>
      </div>

      {/* Contêiner para a biografia */}
      <div className="relative z-10 flex flex-col items-start  bg-white bg-opacity-50 rounded-lg shadow-md w-full max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Hello World</h1>
        <p className="text-gray-800">I'm a Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly. Confident communicator, strategic thinker, and innovative creator to develop software that is customized to meet a company’s organizational needs, highlight their core competencies, and further their success.</p>
      </div>
    </div>
  );
}
