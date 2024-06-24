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
//house icon outline 
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


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
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </div>
    ),
  };

  return (

    <div className="h-screen flex flex-col justify-between items-center bg-white ">

      <div>

      <div className="image-gradient flex flex-start justify-center items-center ">
        <img src="img/cara.png" alt="background" className="w-11/12" />
        {/* <div className="image-text dosis">MEU NOME</div>
        <div className="image-text-2 dosis">prof</div> */}
       

      </div>

      <div className="text-container">

      <div className="dosis text-blue-500 text-4xl items-center justify-center flex">MEU NOME</div>
      <div className="dosis text-black  text-lg font-extrabold items-center justify-center flex">ADM</div>
      <div className="flex flex-col flex-start text-slate-600 items-center justify-center flex text-center pl-10 pr-10" style={{ wordWrap: 'break-word' }}>
        Lorem iasdfasdasd  fwfwfewfwfwefwfwfwefwfwf</div>
      </div>

      
      </div>

      <div className="icons flex justify-center mt-20 ">
        <InstagramIcon className="icon" sx={{ color: 'black', fontSize:26 }} />
        <FacebookIcon className="icon" sx={{ color: 'black', fontSize:26 }} />
        <XIcon className="icon" sx={{ color: 'black',  fontSize:26}} />
        <XIcon className="icon" sx={{ color: 'black',  fontSize:26}} />

      </div>
      
    
      <div>
      <AvatarGroup max={4} className="mb-5"  sx={{
    '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 15, transform: 'translate(0.6rem, 0)',  backgroundColor: '#3b82f6'},
  }}>
        <Avatar alt="Remy Sharp"   sx={{ width: 32, height: 32 ,transform: 'translate(0, 0) !important',   backgroundColor: 'grey !important'}}/>
        
        <Avatar alt="Travis Howard"  sx={{ width: 32, height: 32 ,transform: 'translate(0, 0) !important', backgroundColor: 'grey !important'}}/>
        <Avatar alt="Cindy Baker"  sx={{ width: 32, height: 32 ,transform: 'translate(0, 0) !important', backgroundColor: 'grey !important'}}/>
        <Avatar alt="Agnes Walker"   sx={{ width: 32, height: 32 ,transform: 'translate(0, 0) !important', backgroundColor: 'grey !important'}}/>
        <Avatar alt="Trevor Henderson"   sx={{ width: 32, height: 32 ,transform: 'translate(0, 0) !important', backgroundColor: 'grey !important'}}/>
      </AvatarGroup>

      </div>

      <div className= "h-32 w-full bg-slate-200 items-end flex flex-end justify-end flex-col">

     

      <div className= "h-12 w-full bg-slate-200 items-center flex flex-center flex-col">

      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-20 teste w-40">
        Bubble
      </Button>
    

      </div>

      <div className= "h-12 w-full bg-slate-700 items-center flex flex-center flex-row mb-0 pb-0 rounded-t-2xl" style={{justifyContent : 'space-around'}}>

      {/* <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  w-40">
        Bubble
      </Button> */}
        <TagFacesIcon sx={{ color: 'white' }}/>

        <SearchIcon sx={{ color: 'white' }}/>

      <Button className="hover:bg-slate-200 rounded-full teste2 w-20 h-20  border-slate-200" sx = {{border: '1px !important', backgroundColor: '#e2e8f0'}}>
      <img src="img/sf.gif" alt="gif" style={{ width: '100%', height: '185%', objectFit: 'cover', borderRadius: '50%', backgroundColor: 'FFFFFF', color: 'FFFFFF'}} />

      </Button>

      <HomeOutlinedIcon sx={{ color: 'white' }}/>

      <PersonOutlineIcon sx={{ color: 'white' }}/>

      </div>

      </div>

</div>
   

  );
}
