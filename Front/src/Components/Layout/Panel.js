import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Panel = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el localStorage al cerrar sesión
    localStorage.clear(); // O usar localStorage.removeItem('clave') si solo quieres borrar algo específico

    // Limpiar el estado del usuario (si es necesario)
    // ...

    navigate("/");
  };

  const handleAdminPanelClick = () => {
    navigate("/admin"); // Redirige a la página de administración
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
      <Toolbar>
        {/* Título con click para redirigir */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleAdminPanelClick} // Se añade el click aquí
        >
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
