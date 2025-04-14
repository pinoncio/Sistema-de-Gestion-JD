import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import api from "../Services/apiService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green"); // verde por defecto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/email/send-email", formData);
      console.log(response.data.message);

      setSnackbarMessage("Correo enviado correctamente");
      setSnackbarColor("green");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error al enviar el correo");
      setSnackbarColor("red");
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Formulario de Contacto
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Mensaje"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
        >
          Enviar
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor: snackbarColor,
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
