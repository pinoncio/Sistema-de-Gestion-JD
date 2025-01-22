import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Panel = ({ onMenuClick }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        {/* Icono de menú */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        {/* Título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Panel de Administración
        </Typography>

        {/* Botón de Logout o alguna acción */}
        <Button color="inherit">Cerrar sesión</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Panel;
