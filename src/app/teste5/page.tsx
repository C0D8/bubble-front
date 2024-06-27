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
// import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: '60vw', // 40% da largura da tela
  height: 32, // Um pouco mais grosso
  padding: 0,
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  flexDirection: 'column',

  '&:active': {
    '& .MuiSwitch-thumb': {
      width: '40vw',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(calc(-40vw))', // Ajuste para a nova largura
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 3,
    transition: theme.transitions.create(['transform'], {
      duration: 200,
    }),
    '&.Mui-checked': {
      transform: 'translateX(calc(60vw - 87px))', // Ajuste para a nova largura
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#0f172a',
      },
      '& .MuiSwitch-thumb::after': {
        content: '"NEWS"', // Texto dentro do botão quando ligado
      },
    },
    '&:not(.Mui-checked) + .MuiSwitch-track .MuiSwitch-thumb::after': {
      content: '"SEEN"', // Texto dentro do botão quando desligado
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 80, // Ajuste o tamanho do thumb
    height: 25, // Ajuste o tamanho do thumb
    borderRadius: 15, // Metade do tamanho do thumb para torná-lo redondo
    transition: theme.transitions.create(['width', 'transform'], {
      duration: 200,
    }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif', // Definindo a fonte aqui
    '&::after': {
      content: '"SEEN"', // Texto dentro do botão inicialmente desligado
      color: '#cbd5e1', // Cor do texto
      fontSize: 16, // Tamanho do texto
      position: 'relative',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 999, // Ajuste para a nova altura
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#cbd5e1',
    boxSizing: 'border-box',
  },
}));




const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
    profile: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
    profile: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
    profile: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
    profile: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
    profile: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
    profile: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
];

export default function FloatingActionButtons() {
  const handleRedirect = () => {
    window.location.href = 'https://www.instagram.com/c0d8.zip';
  };

  const handleTrackClick = () => {
    window.location.href = '/tracking';
  }

  const [scrollHeight, setScrollHeight] = useState(200);
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById('scroll-container');
      const scrollPosition = scrollContainer?.scrollTop || 0;

      if (scrollPosition > 2) {
        setScrollHeight(80);
        setIsTextVisible(false);
      } else {
        setScrollHeight(200);
        setIsTextVisible(true);
      }
    };

    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return (
    <div className="h-screen flex flex-col justify-between items-center bg-white" style={{ backgroundColor:'#F8F9FD'}}>


      <div className="relative">
        <div className="bg-white flex flex-center justify-center items-center mt-10 w-screen" style={{ backgroundColor:'#F8F9FD'}}>


        <Box
  sx={{
    display: 'flex',
    gap: 1,
    py: 1,
    overflow: 'auto',
    width: 400,
    scrollSnapType: 'x mandatory',
    '& > *': {
      scrollSnapAlign: 'center',
    },
    '::-webkit-scrollbar': { display: 'none' },
  }}
>
  {data.map((item) => (
    <Card 
      orientation="vertical" 
      key={item.title} 
      variant="outlined"
      size='lg'
      sx={{
        position: 'relative',
        backgroundImage: `url(${item.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: 300,
        height: `${scrollHeight}px`, // Altura dinâmica baseada no estado
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150, 
        minHeight:50
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: 'white',
          textShadow: '0 0 2px black',
         
        }}
        className={isTextVisible ? 'visible' : 'hidden'}
      >
        <Typography level="body-sm" className='w-5 text-white' id = 'views-text'>{item.description}</Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 50, // Ajuste a altura conforme necessário
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajuste a cor e opacidade conforme necessário
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1, // Garante que a barra esteja acima da imagem mas abaixo do avatar
        }}
        className="rounded-b-xl"
      >
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeInset="14%"
          color="success"
          sx={{
            [`& .${badgeClasses.badge}`]: {
              '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '2px solid',
                borderColor: 'success.500',
                content: '""',
              },
            },
            '@keyframes ripple': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '100%': {
                transform: 'scale(2)',
                opacity: 0,
              },
            },
            position: 'relative',
            bottom: 25, // Ajusta a posição para ficar em cima da linha preta
            marginRight: 1, // Espaçamento entre avatar e texto
          }}
        >
          <Avatar src={item.profile} />
        </Badge>

        <Typography level="body-sm" className='text-white' sx= {{  position: 'relative',
            bottom: 25, // Ajusta a posição para ficar em cima da linha preta
            marginRight: 1}}>
          {item.title}
        </Typography>
      </Box>
    </Card>
  ))}

</Box>

        </div>

        <div className='w-screen flex items-center justify-center'>
     
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }}/>
      
       

</div>

      </div>

      <Box
        sx={{
          width: 400,
          height: 800, // Set a fixed height for the box
          overflowY: 'auto', // Enable vertical scrolling
          borderRadius: 2,
          mt: 1,
          gap: 1,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
                scrollSnapAlign: 'center',
              },
         
         

        }}
      id="scroll-container"

      >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }} className="rounded-t-2xl">

          <div className='flex flex-row justify-between items-center'>

        

        <div className="flex fle-col items-center h-4">
              <Avatar 
                src="https://randomuser.me/api/portraits/men/2.jpg"
                sx={{ 
                  width: 32, 
                  height: 32, 
                }}
              />
 <Typography level="body-sm" className="pl-2" >User</Typography>
              </div>

              <div className="items-center justify-center flex flex-col">
               <Button className="hover:bg-slate-200 rounded-full flex flex-col items-center justify-center" sx={{border: '1px !important', backgroundColor: '#F8F9FD', borderColor: '#F8F9FD'}}>
                ...
              </Button>
              </div>

              </div>
             

          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                loading="lazy"
                alt=""
                className="rounded-b-2xl"
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
             {/* user badge  */}
            
             <Typography level="title-md">Yosemite National Park</Typography>
             <Typography level="body-sm">California</Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                6.3k views
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                1 hour ago
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>


        <Card variant="outlined" sx={{ width: '100%', height: '100%' }} className="rounded-t-2xl">

          <div className='flex flex-row justify-end items-center'>


              <div className="items-center justify-center flex flex-col">
               <Button className="hover:bg-slate-200 rounded-full flex flex-col items-center justify-center  h-1 w-1" sx={{border: '1px !important', backgroundColor: '#F8F9FD', borderColor: '#F8F9FD'}}>
                ...
              </Button>
              </div>

              </div>
             
          <CardContent>
             {/* user badge  */}
            
             <Typography level="title-md">Yosemite National Park</Typography>
             <Typography level="body-sm">California</Typography>

             <div>
               <div className="flex fle-col items-center h-8 justify-between mt-2">


                <div className='flex fle-col items-center'> 

              <Avatar 
                src="https://randomuser.me/api/portraits/men/2.jpg"
                sx={{ 
                  width: 32, 
                  height: 32, 
                }}
              />

              <Typography level="body-sm" className="pl-2" >User</Typography>

              </div>

              <XIcon className="icon" sx={{ color: 'black',  fontSize:18}} />
            
              </div>

              </div>

            


          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                6.3k views
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                1 hour ago
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
        


        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                loading="lazy"
                alt=""
                className="rounded-b-2xl"
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="title-md">Yosemite National Park</Typography>
            <Typography level="body-sm">California</Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                6.3k views
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                1 hour ago
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                loading="lazy"
                alt=""
                className="rounded-b-2xl"
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="title-md">Yosemite National Park</Typography>
            <Typography level="body-sm">California</Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                6.3k views
              </Typography>
              <Divider orientation="vertical" />
              <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                1 hour ago
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      </Box>

     

          <div className="h-12 w-full bg-slate-900 items-center flex flex-center flex-row mb-0 pb-0 rounded-t-2xl" style={{justifyContent : 'space-around'}}>
      <TagFacesIcon sx={{ color: '#F8F9FD' }}/>
      <SearchIcon sx={{ color: '#F8F9FD' }}/>

      <Button 
        className="hover:bg-slate-300 rounded-full w-20 h-20" 
        sx={{ 
          borderBottom: '40px solid #F8F9FD', // Define a borda inferior
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#F8F9FD',
          transform: 'translateY(-30%)' // Corrige o translade para transform e ajusta a posição
        }} 
        onClick={handleTrackClick}
      >
        <div    style={{transform :  'translateY(32%)'}}>
        <img src="img/bolaboa.gif" alt="gif" className='h-16 w-16 rounded-full drop-shadow-lg'  />
        </div>
      </Button>


      <HomeOutlinedIcon sx={{ color: '#F8F9FD' }}/>
      <PersonOutlineIcon sx={{ color: '#F8F9FD' }}/>
    </div>
    </div>
  );
}
