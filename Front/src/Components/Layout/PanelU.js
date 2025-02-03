import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"; // Importa la imagen

const Panel = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePanelClick = () => {
    navigate("/user"); // Redirige a la página de administración
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
      <Toolbar>
        {/* Contenedor para el logo y el título */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          {/* Imagen del logo */}
          <img
            src={logo} // Usando la variable importada
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          {/* Título */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handlePanelClick} // Se añade el click aquí
          >
            Sistema de Gestión JD
          </Typography>
        </Box>

        {/* Botón de Logout */}
        <Button color="inherit" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Panel;
