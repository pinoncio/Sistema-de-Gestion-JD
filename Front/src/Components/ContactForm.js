import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import api from "../Services/apiService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, email, message } = formData;
    if (!name || !phone || !email || !message) {
      setFeedback({ type: "error", message: "Todos los campos son obligatorios" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      await api.post("/email/send-email", formData);
      setFeedback({ type: "success", message: "Formulario enviado correctamente" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.error || "Error al enviar el formulario" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Formulario de Contacto
      </Typography>
      
      {feedback.message && (
        <Alert severity={feedback.type} sx={{ marginBottom: 2 }}>
          {feedback.message}
        </Alert>
      )}

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
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
