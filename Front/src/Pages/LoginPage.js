import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import loginUser from "../Services/authService";
import { AccountCircle, Lock } from "@mui/icons-material";
import "../Styles/login.css";

// Función para formatear el RUT
const formatRUT = (rut) => {
  let cleanedRUT = rut.replace(/\D/g, "").slice(0, 9); // Asegura que solo haya hasta 9 números
  if (cleanedRUT.length <= 8) {
    cleanedRUT = cleanedRUT.replace(/(\d{1})(\d{3})(\d{3})/, "$1.$2.$3-");
  } else if (cleanedRUT.length === 9) {
    cleanedRUT = cleanedRUT.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})/,
      "$1.$2.$3-$4"
    );
  } else {
    cleanedRUT = cleanedRUT.substring(0, 9); // Limitar a 9 caracteres
  }
  return cleanedRUT;
};

// Función para validar el RUT
const validateRut = (rut) => {
  let rutSinPuntos = rut.replace(/[^\dKk]/g, "");
  if (rutSinPuntos.length < 8 || rutSinPuntos.length > 9) return false;

  const cuerpo = rutSinPuntos.slice(0, -1);
  const dv = rutSinPuntos.slice(-1).toUpperCase();
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = suma % 11;
  const dvCalculado = resto === 1 ? "K" : resto === 0 ? "0" : 11 - resto;
  return dv === dvCalculado.toString();
};

const LoginPage = () => {
  const [rut, setRut] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleRUTChange = (e) => {
    let value = e.target.value;
    let onlyValidChars = value.replace(/[^0-9.-]/g, "");
    const onlyNumbers = onlyValidChars.replace(/[^\d]/g, "");

    if (onlyValidChars.length !== value.length) {
      setError("Solo se permiten números, puntos y guiones.");
      setOpenSnackbar(true);
    } else {
      setError(null);
    }

    let formattedRUT = formatRUT(onlyNumbers);
    if (formattedRUT.endsWith("-") && e.target.value.length < rut.length) {
      formattedRUT = formattedRUT.slice(0, -1);
    }

    setRut(formattedRUT);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateRut(rut)) {
      setError("El RUT ingresado no es válido.");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(rut, contrasenia);
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ idUsuario: data.idUsuario, rol: data.rol })
      );
      navigate("/users");
    } catch (err) {
      console.error("Error recibido:", err); // Imprime el error completo

      // Si el error tiene respuesta, mostramos el mensaje apropiado
      let errorMessage = err.message || "Hubo un problema con la autenticación. Intenta nuevamente.";

      setError(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Box className="image-section"></Box>
      <Box className="form-section">
        <Container component="main" maxWidth="xs" className="form-wrapper">
          <Box className="login-box">
            <Typography variant="h4" className="login-title">
              Bienvenido
            </Typography>
            <Typography variant="body1" className="login-subtitle">
              Por favor, ingresa tus credenciales
            </Typography>
            <form onSubmit={handleSubmit} className="login-form">
              <Stack spacing={3}>
                <Box className="input-with-icon">
                  <AccountCircle className="icon" />
                  <TextField
                    label="Rut de usuario"
                    variant="outlined"
                    fullWidth
                    value={rut}
                    onChange={handleRUTChange}
                    required
                    className="login-input"
                  />
                </Box>
                <Box className="input-with-icon">
                  <Lock className="icon" />
                  <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    required
                    className="login-input"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  className="login-button"
                >
                  {loading ? (
                    <CircularProgress size={24} className="spinner" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginPage;
