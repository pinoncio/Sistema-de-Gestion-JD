import React from 'react';
import { Box } from '@mui/material';
import PanelU from './PanelU'; // Importamos el Panel de administración

const UserLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Panel de administración */}
      <PanelU />
      
      {/* Contenido principal de la página */}
      <Box component="main" sx={{ flexGrow: 1, padding: '16px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default UserLayout;
