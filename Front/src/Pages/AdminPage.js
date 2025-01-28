import React from 'react';
import { Box, Grid2, Paper, Typography, Container } from '@mui/material';
import { People, GroupAdd, AccountBox, Settings, Help, InsertChart } from '@mui/icons-material'; // Añadimos más iconos
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Components/Layout/AdminLayout';

const AdminHome = () => {
  const navigate = useNavigate();

  // Añadimos más "stats" vacíos
  const stats = [
    { icon: <People sx={{ fontSize: '6rem' }} />, title: "Usuarios", route: "/users" },
    { icon: <GroupAdd sx={{ fontSize: '6rem' }} />, title: "Roles", route: "/role" },
    { icon: <AccountBox sx={{ fontSize: '6rem' }} />, title: "Perfil", route: "" },
    { icon: <Settings sx={{ fontSize: '6rem' }} />, title: "Configuración", route: "" },
    { icon: <Help sx={{ fontSize: '6rem' }} />, title: "Ayuda", route: "" },
    { icon: <InsertChart sx={{ fontSize: '6rem' }} />, title: "Graficas", route: "" },
  ];

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <AdminLayout>
      {/* Fondo de la página */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Bienvenido, Administrador
          </Typography>

          {/* Box que envuelve los stats */}
          <Box sx={{ bgcolor: '#f4f4f4', padding: 6, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', mb: 4 }}>
            {/* Grid de paneles informativos */}
            <Grid2 container spacing={10}>
              {stats.map((stat, index) => (
                <Grid2 item xs={12} sm={6} md={4} lg={2} key={index}> {/* Añadimos más columnas */}
                  <Paper 
                    sx={{
                      padding: 3, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      bgcolor: '#e0e0e0', // Fondo gris claro
                      color: 'black',
                      borderRadius: 3,
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)',
                      height: 240,
                      width: 240,  // Asegura que todos los stats tengan el mismo ancho
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        bgcolor: '#d3d3d3', // Cambio de color al pasar el ratón
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                        transform: 'scale(1.05)',
                      },
                    }}
                    onClick={() => handleClick(stat.route)}
                  >
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {stat.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
                      {stat.title}
                    </Typography>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminHome;
