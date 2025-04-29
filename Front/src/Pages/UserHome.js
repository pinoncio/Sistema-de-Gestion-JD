import React, { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  Paper,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  People,
  Category,
  Inventory,
  Assignment,
  Description,
  MonetizationOn,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import UserLayout from "../Components/Layout/UserLayout";

const UserHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para manejar la visibilidad del Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state?.error) {
      setErrorMessage(location.state.error);
      setOpenSnackbar(true); // Mostrar Snackbar cuando haya un error
    }
  }, [location.state?.error]);

  // Función para manejar el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const stats = [
    {
      icon: <People sx={{ fontSize: "6rem" }} />,
      title: "Clientes",
      route: "/cliente",
    },
    {
      icon: <Category sx={{ fontSize: "6rem" }} />,
      title: "Categorias",
      route: "/categoria",
    },
    {
      icon: <Inventory sx={{ fontSize: "6rem" }} />,
      title: "Insumo",
      route: "/insumo",
    },
    {
      icon: <Assignment sx={{ fontSize: "6rem" }} />,
      title: "Ordenes de Trabajo",
      route: "/ots",
    },
    {
      icon: <Description sx={{ fontSize: "6rem" }} />,
      title: "Informes de Trabajo",
      route: "/its",
    },
    {
      icon: <MonetizationOn sx={{ fontSize: "6rem" }} />,
      title: "Gastos",
      route: "/gastos",
    },
  ];

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <UserLayout>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffff",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: "2.5rem",
              textAlign: { xs: "center", sm: "left" }, // CENTRAR EN PANTALLAS PEQUEÑAS
              mb: 4,
            }}
          >
            Bienvenido, al Sistema de Gestión JD
          </Typography>

          {/* Mostrar Snackbar si hay mensaje de error */}
          {errorMessage && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posición en la esquina superior derecha
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          )}

          <Box
            sx={{
              bgcolor: "#f4f4f4",
              padding: 6,
              borderRadius: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
              mb: 4,
            }}
          >
            <Grid2 container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid2
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      bgcolor: "#e0e0e0",
                      color: "black",
                      borderRadius: 3,
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.6)",
                      width: { xs: 280, sm: 240 },
                      height: { xs: 280, sm: 240 },
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        bgcolor: "#d3d3d3",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => handleClick(stat.route)}
                  >
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {stat.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1.25rem", textAlign: "center" }}
                    >
                      {stat.title}
                    </Typography>
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  );
};

export default UserHome;
