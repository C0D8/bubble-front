'use client'
import * as React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import FourKIcon from '@mui/icons-material/FourK';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

export default function FloatingActionButtons() {
  const [favoriteClicked, setFavoriteClicked] = useState(false);

  const handleRedirect = () => {
    // Redireciona para a página teste2
    window.location.href = '/teste2';
  };

  const handleFavoriteClick = () => {
    setFavoriteClicked(!favoriteClicked);
  };

  return (
    // Imagem de fundo para a tela
    <div className="bg-gradient-to-b from-gray-600 to-gray-200 h-screen flex flex-col justify-end items-center pr-5 pl-5 relative">
      <img src="https://i.pinimg.com/564x/c6/52/f5/c652f5f01792295b0846c8c06042bf1a.jpg" alt="background" className="absolute inset-0 w-screen h-screen object-cover" />
      
      {/* Contêiner para o texto e os botões */}
      <div className="relative z-10 flex flex-col items-center space-y-4 mb-8 w-full">
        {/* Texto com nome e idade */}
        <div className="absolute left-0 bottom-48 flex flex-col items-start space-y-2">
          <div className='flex flex-row'>
            <h1 className="text-2xl font-bold text-white pr-2">Nome do Usuario, 27</h1>
            <SentimentNeutralIcon sx={{ color: 'white' }}/>
          </div>
          <div className='flex flex-row'>
            <LocationOnIcon sx={{ color: 'white' }}/>
            <p className="text-white pl-2 font-thin">Rio de Janeiro - Brasil</p>
          </div>
        </div>

        {/* Div com botões um ao lado do outro */}
        <div className="flex space-x-3 items-center">
          <Button variant="contained" className="rounded-full w-16 h-16" sx={{ backgroundColor: '#FFFFFF', color: '#A9A9A9', '&:hover': { backgroundColor: '#FFFFFF' } }}>
            <ClearIcon />
          </Button>

          <Button variant="contained" className="rounded-full w-24 h-24" sx={{ backgroundColor: '#F1F1F1', color: '#F1F1F1', '&:hover': { backgroundColor: '#F1F1F1' } }} onClick={handleRedirect}>
            {/* Adiciona um GIF ao botão */}
            <img src="https://i.pinimg.com/originals/27/cb/15/27cb154468c0b7b0e53ddbbb5f371b8b.gif" alt="gif" style={{ width: '100%', height: '75%', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'FFFFFF', color: 'FFFFFF'}} />
          </Button>

          <Button 
            variant="contained" 
            className="rounded-full w-16 h-16" 
            sx={{ backgroundColor: '#FFFFFF', color: favoriteClicked ? 'red' : '#A9A9A9', '&:hover': { backgroundColor: '#FFFFFF' }}}
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon />
          </Button>
        </div>

        <Button 
          variant="contained" 
          className="rounded-md w-full h-12 fixed-color-button color-button color" 
          sx={{ backgroundColor: '#FFFFFF', color: '#A9A9A9' }}
        >
          Chat
        </Button>
      </div>
    </div>
  );
}
