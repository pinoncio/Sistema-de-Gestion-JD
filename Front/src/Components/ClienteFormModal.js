import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

const ClienteFormModal = ({ open, onClose, onSubmit, clienteData = {}, editing }) => {
  const [formData, setFormData] = useState({
    CODIGO_CLIENTE: "",
    NOMBRE_RAZON_SOCIAL: "",
    NOMBRE_FANTASIA: "",
    RUT: "",
    GIRO: "",
    DIRECCION: "",
    CIUDAD: "",
    COMUNA: "",
    TELEFONO_FIJO: "",
    TELEFONO_CELULAR: "",
    CORREO_ELECTRONICO: "",
    CLIENTE_VIGENTE: true,
  });

  useEffect(() => {
    if (editing && clienteData) {
      setFormData(clienteData);
    } else {
      setFormData({
        CODIGO_CLIENTE: "",
        NOMBRE_RAZON_SOCIAL: "",
        NOMBRE_FANTASIA: "",
        RUT: "",
        GIRO: "",
        DIRECCION: "",
        CIUDAD: "",
        COMUNA: "",
        TELEFONO_FIJO: "",
        TELEFONO_CELULAR: "",
        CORREO_ELECTRONICO: "",
        CLIENTE_VIGENTE: true,
      });
    }
  }, [clienteData, editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <h2>{editing ? "Editar Cliente" : "Añadir Cliente"}</h2>
        <form>
          <TextField
            label="Código Cliente"
            name="CODIGO_CLIENTE"
            value={formData.CODIGO_CLIENTE}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Razón Social"
            name="NOMBRE_RAZON_SOCIAL"
            value={formData.NOMBRE_RAZON_SOCIAL}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nombre Fantasía"
            name="NOMBRE_FANTASIA"
            value={formData.NOMBRE_FANTASIA}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="RUT"
            name="RUT"
            value={formData.RUT}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Giro"
            name="GIRO"
            value={formData.GIRO}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            name="DIRECCION"
            value={formData.DIRECCION}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ciudad"
            name="CIUDAD"
            value={formData.CIUDAD}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comuna"
            name="COMUNA"
            value={formData.COMUNA}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono Fijo"
            name="TELEFONO_FIJO"
            value={formData.TELEFONO_FIJO}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono Celular"
            name="TELEFONO_CELULAR"
            value={formData.TELEFONO_CELULAR}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            name="CORREO_ELECTRONICO"
            value={formData.CORREO_ELECTRONICO}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.CLIENTE_VIGENTE}
                onChange={handleChange}
                name="CLIENTE_VIGENTE"
              />
            }
            label="Cliente Vigente"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editing ? "Actualizar" : "Añadir"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ClienteFormModal;
