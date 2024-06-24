'use client'
import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { Button } from '@mui/material';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css'; // Import the custom CSS file
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function FloatingActionButtons() {


  const handleRedirect = () => {
    window.location.href = 'https://www.instagram.com/c0d8.zip';
  };

  
  return (
    <div className="h-screen flex flex-col justify-between items-center bg-white" style={{ backgroundColor:'#F8F9FD'}}>

      <div className="relative">
        <div className="bg-white flex flex-center justify-center items-center mt-80 w-screen" style={{ backgroundColor:'#F8F9FD'}}>
          <img src="img/bb.gif" alt="background" className="w-max" />
          <FileUploadOutlinedIcon 
    sx={{ 
      color: '#475569', 
      fontSize: 50, 
      position: 'absolute', 
      top: '70%', 
      left: '50%', 
      transform: 'translate(-50%, 30%)' 
    }} />
        </div>
      </div>

      <div className="h-12 w-full bg-slate-700 items-center flex flex-center flex-row mb-0 pb-0 rounded-t-2xl" style={{justifyContent : 'space-around'}}>
        <TagFacesIcon sx={{ color: '#F8F9FD' }}/>
        <SearchIcon sx={{ color: '#F8F9FD' }}/>

        <Button className="hover:bg-slate-200 rounded-full teste2 w-20 h-20" sx={{border: '1px !important', backgroundColor: '#F8F9FD', borderColor: '#F8F9FD'}}>
          <img src="img/sf.gif" alt="gif" style={{ width: '100%', height: '185%', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'FFFFFF', color: 'FFFFFF'}} />
        </Button>

        <HomeOutlinedIcon sx={{ color: '#F8F9FD' }}/>
        <PersonOutlineIcon sx={{ color: '#F8F9FD' }}/>
      </div>
    </div>
  );
}
