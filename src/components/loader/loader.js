// src/components/Loader.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
