'use client'
import * as React from 'react';
import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';

export default function FloatingActionButtons() {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(!isClicked);
  };


  // handleclick no botão de entrar para ir pro feed 
  const handleEntrarClick = () => {
    window.location.href = "/teste5";
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: '#F8F9FD' }}>
      <div className="relative w-screen h-screen flex flex-col justify-center items-center" style={{ backgroundColor: '#F8F9FD' }}>
        <motion.img
          src="img/bb.gif"
          alt="background"
          className="absolute w-8/12 object-cover"
          style={{ cursor: 'pointer' }}
          animate={{ y: isClicked ? -110 : 0, scale: isClicked ? 0.8 : 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleImageClick}
        />
        <motion.h1
          className="text-black text-center z-10 text-4xl"
          animate={{ y: isClicked ? -110 : 0, scale: isClicked ? 0.8 : 1 }}
          transition={{ duration: 0.5 }}
        >
          Bubble
        </motion.h1>
      </div>
      {isClicked && (
        <div className="flex flex-col items-center justify-center space-y-2 w-full absolute inset-y-2/3 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              label="Login"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "9999px",
                  width: "35vh",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  background: 'linear-gradient(90deg, rgba(2,0,36,0.08) 0%, rgba(184,184,184,0.08) 100%)',
                },
                startAdornment: (
                  <InputAdornment position="start" sx={{ paddingLeft: 0, marginLeft: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4vh',
                        height: '4vh',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        alignContent: 'start',
                        paddingLeft: 0,
                        marginLeft: 0,
                        transform: 'translate(-20%, 0)'
                      }}
                    >
                      <PersonOutlineIcon />
                    </div>
                  </InputAdornment>
                )
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              label="Senha"
              variant="outlined"
              type='password'
              InputProps={{
                style: {
                  borderRadius: "9999px",
                  width: "35vh",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  background: 'linear-gradient(90deg, rgba(2,0,36,0.08) 0%, rgba(184,184,184,0.08) 100%)',
                },
                startAdornment: (
                  <InputAdornment position="start" sx={{ paddingLeft: 0, marginLeft: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4vh',
                        height: '4vh',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        alignContent: 'start',
                        paddingLeft: 0,
                        marginLeft: 0,
                        transform: 'translate(-20%, 0)'
                      }}
                    >
                      <LockOutlinedIcon />
                    </div>
                  </InputAdornment>
                )
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              color="primary"
              className="rounded-full h-12"
              sx={{ borderRadius: 99999, width: "35vh" }}
              onClick={handleEntrarClick}
            >
              Entrar
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Typography variant="body2" color="textSecondary">
              Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se aqui</Link>.
            </Typography>
          </motion.div>
        </div>
      )}
    </div>
  );
}
