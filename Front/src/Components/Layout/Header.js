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
} from "@mui/material";
import { Facebook, Call, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [copiedTooltip, setCopiedTooltip] = useState(false);

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

        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Button color="inherit" onClick={() => smoothScrollTo("portada")}>
            Portada
          </Button>
          <Button color="inherit" onClick={() => smoothScrollTo("nosotros")}>
            Nosotros
          </Button>
          <Button color="inherit" onClick={() => smoothScrollTo("contacto")}>
            Contacto
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Facebook">
            <IconButton
              color="inherit"
              href="https://www.facebook.com/share/15yDYrHEhC/?mibextid=wwXIfr"
              target="_blank"
            >
              <Facebook sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

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
            <Tooltip title={copiedTooltip ? "¡Copiado!" : "Copiar número"}>
              <IconButton
                color="inherit"
                sx={{ color: "black" }}
                onClick={copyPhoneNumber}
              >
                <Call />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: "black", marginLeft: 1 }}>
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
  );
};

export default Header;
