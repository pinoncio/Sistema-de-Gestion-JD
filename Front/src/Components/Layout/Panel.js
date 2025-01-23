import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; 

const Panel = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el estado del usuario (si es necesario)
    // ...

    navigate('/'); 
  };

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
        <Button color="inherit" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Panel;