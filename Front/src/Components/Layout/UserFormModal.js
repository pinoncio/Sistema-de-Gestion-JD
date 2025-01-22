import React, { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";
import "../../Styles/FormUser.css";

const UserFormModal = ({ open, onClose, onSubmit, userData, editing, setEditing, setEditId }) => {
  const [formData, setFormData] = useState({
    NOMBRE_USUARIO: "",
    APELLIDO_USUARIO: "",
    EMAIL_USUARIO: "",
    CONTRASENA_USUARIO: "",
    FECHA_NACIMIENTO_USUARIO: "",
    ROL_USUARIO: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        NOMBRE_USUARIO: userData.NOMBRE_USUARIO || "",
        APELLIDO_USUARIO: userData.APELLIDO_USUARIO || "",
        EMAIL_USUARIO: userData.EMAIL_USUARIO || "",
        CONTRASENA_USUARIO: "",
        FECHA_NACIMIENTO_USUARIO: userData.FECHA_NACIMIENTO_USUARIO || "",
        ROL_USUARIO: userData.ROL_USUARIO || "",
      });
    } else {
      setFormData({
        NOMBRE_USUARIO: "",
        APELLIDO_USUARIO: "",
        EMAIL_USUARIO: "",
        CONTRASENA_USUARIO: "",
        FECHA_NACIMIENTO_USUARIO: "",
        ROL_USUARIO: "",
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
    setEditing(false);
    setEditId(null);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>{editing ? "Editar Usuario" : "Crear Usuario"}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            value={formData.NOMBRE_USUARIO}
            onChange={(e) => setFormData({ ...formData, NOMBRE_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            value={formData.APELLIDO_USUARIO}
            onChange={(e) => setFormData({ ...formData, APELLIDO_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo electrónico"
            value={formData.EMAIL_USUARIO}
            onChange={(e) => setFormData({ ...formData, EMAIL_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            type="password"
            value={formData.CONTRASENA_USUARIO}
            onChange={(e) => setFormData({ ...formData, CONTRASENA_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Nacimiento"
            type="date"
            value={formData.FECHA_NACIMIENTO_USUARIO}
            onChange={(e) => setFormData({ ...formData, FECHA_NACIMIENTO_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Rol"
            value={formData.ROL_USUARIO}
            onChange={(e) => setFormData({ ...formData, ROL_USUARIO: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
        </form>
      </div>
    </Modal>
  );
};

export default UserFormModal;
