import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  Card,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Facebook, Call, Person, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [copiedTooltip, setCopiedTooltip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText("+56 9 8824 0071");
      setCopiedTooltip(true);
      setTimeout(() => setCopiedTooltip(false), 2000);
    } catch (err) {
      console.error("Error al copiar el número", err);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const smoothScrollTo = (targetId, duration = 700) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerOffset = 70;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run =
        easeInOutQuad(timeElapsed / duration) * distance + startPosition;
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const menuItems = [
    { label: "Portada", id: "portada" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#000000" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={logo} alt="Logo JDService" style={{ width: 40, height: 40 }} />
            <Typography variant="subtitle1" sx={{ display: { xs: "none", sm: "block" } }}>
              Mantención y Reparación de Maquinaria Agrícola
            </Typography>
          </Box>

          {/* Menú en pantallas grandes */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                onClick={() => smoothScrollTo(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Menú hamburguesa en móviles */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Elementos fijos al lado derecho */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Facebook">
              <IconButton
                color="inherit"
                href="https://www.facebook.com/share/15yDYrHEhC/?mibextid=wwXIfr"
                target="_blank"
              >
                <Facebook sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>

            <Card
              sx={{
                backgroundColor: "#f1c40f",
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "20px",
                marginLeft: 2,
              }}
            >
              <Tooltip title={copiedTooltip ? "¡Copiado!" : "Copiar número"}>
                <IconButton
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={copyPhoneNumber}
                >
                  <Call />
                </IconButton>
              </Tooltip>
              <Typography variant="body2" sx={{ color: "black", ml: 1 }}>
                +56 9 8824 0071
              </Typography>
            </Card>

            <Button
              color="inherit"
              sx={{
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                },
              }}
              onClick={handleLoginClick}
            >
              <Person sx={{ marginRight: 1 }} />
              Iniciar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para menú móvil */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menú
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => {
                  smoothScrollTo(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
