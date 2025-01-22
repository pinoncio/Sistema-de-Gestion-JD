import React from 'react';
import { Box } from '@mui/material';
import Panel from './Panel'; // Importamos el Panel de administración

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Panel de administración */}
      <Panel />
      
      {/* Contenido principal de la página */}
      <Box component="main" sx={{ flexGrow: 1, padding: '16px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
