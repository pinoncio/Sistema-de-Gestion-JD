import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  Card,
} from "@mui/material";
import { Facebook, Call } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import logo from "../../assets/images/logo.jpg";
import { Person } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src={logo}
          alt="Logo JDService"
          style={{ width: "40px", height: "40px" }}
        />
        <hr />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mantención y Reparación de Maquinaria Agrícola
        </Typography>

        {/* Menú para dispositivos grandes */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Button color="inherit">Portada</Button>
          <Button color="inherit">Nosotros</Button>
          <Button color="inherit">Contacto</Button>
        </Box>

        {/* Iconos y número de contacto */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Instagram">
            <IconButton
              color="inherit"
              href="https://www.instagram.com/jdserviciotecnico"
              target="_blank"
            >
              <Instagram sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Facebook">
            <IconButton
              color="inherit"
              href="https://www.facebook.com/jdserviciotecnico"
              target="_blank"
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

          {/* Card para el número de contacto */}
          <Card
            sx={{
              backgroundColor: "#f1c40f",
              display: "flex",
              alignItems: "center",
              padding: "5px 15px",
              borderRadius: "20px",
              marginLeft: 2,
            }}
          >
            <IconButton color="inherit" sx={{ color: "black" }}>
              <Call />
            </IconButton>
            <Typography variant="body2" sx={{ color: "black", marginLeft: 1 }}>
              +56997425801
            </Typography>
          </Card>

          <Button
            color="inherit"
            sx={{
              marginLeft: 2,
              "&:hover": {
                backgroundColor: "#e74c3c", // Rojo brillante
                color: "#fff", // Cambia el texto a blanco en hover
              },
            }}
          >
            <IconButton color="inherit" sx={{ marginRight: 1 }}>
              <Person />
            </IconButton>
            Iniciar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
