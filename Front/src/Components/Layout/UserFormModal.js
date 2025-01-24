import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import "../../Styles/FormUser.css";

const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  userData,
  editing,
  setEditing,
  setEditId,
  roles,
}) => {
  const [formData, setFormData] = useState({
    NOMBRE_USUARIO: "",
    APELLIDO_USUARIO: "",
    RUT_USUARIO: "",
    EMAIL_USUARIO: "",
    CONTRASENIA_USUARIO: "",
    FECHA_NACIMIENTO_USUARIO: "",
    ROL_USUARIO: "",
  });

  const [errors, setErrors] = useState({
    NOMBRE_USUARIO: "",
    APELLIDO_USUARIO: "",
    RUT_USUARIO: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        NOMBRE_USUARIO: userData.NOMBRE_USUARIO || "",
        APELLIDO_USUARIO: userData.APELLIDO_USUARIO || "",
        RUT_USUARIO: userData.RUT_USUARIO || "",
        EMAIL_USUARIO: userData.EMAIL_USUARIO || "",
        CONTRASENIA_USUARIO: userData.CONTRASENIA_USUARIO || "",
        FECHA_NACIMIENTO_USUARIO: userData.FECHA_NACIMIENTO_USUARIO || "",
        ROL_USUARIO: userData.ROL_USUARIO || "",
      });
    } else {
      setFormData({
        NOMBRE_USUARIO: "",
        APELLIDO_USUARIO: "",
        RUT_USUARIO: "",
        EMAIL_USUARIO: "",
        CONTRASENIA_USUARIO: "",
        FECHA_NACIMIENTO_USUARIO: "",
        ROL_USUARIO: "",
      });
    }
  }, [userData]);

  const validateName = (value) => {
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({ ...errors, [field]: "Solo se permiten letras y espacios." });
    }
  };

  const formatRUT = (rut) => {
    // Limitar a 9 dígitos como máximo
    let cleanedRUT = rut.replace(/\D/g, "").slice(0, 9); // Asegura que solo haya hasta 9 números

    // Verificar si el RUT tiene 8 o 9 dígitos
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

  const handleRUTChange = (e) => {
    let value = e.target.value;

    // Eliminar todo lo que no sea número, punto o guion
    let onlyValidChars = value.replace(/[^0-9.-]/g, "");

    // Verificar si se permite el guion y punto solo en posiciones correctas
    const onlyNumbers = onlyValidChars.replace(/[^\d]/g, ""); // Solo números
    if (onlyValidChars.length !== value.length) {
      setErrors({
        ...errors,
        RUT_USUARIO: "Solo se permiten números, puntos y guiones.",
      });
    } else {
      setErrors({ ...errors, RUT_USUARIO: "" });
    }

    // Formatear el RUT solo con los números
    let formattedRUT = formatRUT(onlyNumbers);

    // Si el último carácter es un guion y el usuario borra, se elimina el guion
    if (
      formattedRUT.endsWith("-") &&
      e.target.value.length < formData.RUT_USUARIO.length
    ) {
      formattedRUT = formattedRUT.slice(0, -1); // Eliminar el guion si se está borrando
    }

    // Actualizar el estado del formulario con el RUT formateado
    setFormData({ ...formData, RUT_USUARIO: formattedRUT });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );
  
    if (!validateEmail(lowerCaseFormData.email_usuario)) {
      setErrors({ ...errors, EMAIL_USUARIO: "El correo electrónico no es válido." });
      return;
    }
  
    if (
      !lowerCaseFormData.nombre_usuario ||
      !lowerCaseFormData.apellido_usuario ||
      !lowerCaseFormData.contrasenia_usuario
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }
  
    try {
      await onSubmit(lowerCaseFormData);
      onClose();
      setEditing(false);
      setEditId(null);
      // Aquí podrías reemplazar la alerta por una notificación global o un mensaje en el UI
      // Ejemplo: setSuccessMessage("Usuario creado/actualizado exitosamente!");
    } catch (error) {
      console.error("Error al crear/actualizar usuario:", error);
      if (error.response && error.response.data) {
        setErrors({ ...errors, GENERALES: error.response.data.message || "Ha ocurrido un error." });
      } else {
        setErrors({ ...errors, GENERALES: "Ha ocurrido un error. Intente nuevamente." });
      }
    }
  };
  

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>
          {editing
            ? "Formulario para editar Usuario"
            : "Formulario para crear Usuario"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <TextField
                label="Nombre"
                value={formData.NOMBRE_USUARIO}
                onChange={(e) => handleNameChange(e, "NOMBRE_USUARIO")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.NOMBRE_USUARIO ||
                  (!formData.NOMBRE_USUARIO ? "El nombre es obligatorio." : "")
                }
                error={!!errors.NOMBRE_USUARIO}
              />
              <TextField
                label="Apellido"
                value={formData.APELLIDO_USUARIO}
                onChange={(e) => handleNameChange(e, "APELLIDO_USUARIO")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.APELLIDO_USUARIO ||
                  (!formData.APELLIDO_USUARIO
                    ? "El apellido es obligatorio."
                    : "")
                }
                error={!!errors.APELLIDO_USUARIO}
              />
              <TextField
                label="Rut"
                value={formData.RUT_USUARIO}
                onChange={handleRUTChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.RUT_USUARIO ||
                  "Por favor ingrese su RUT sin punto(.) y guión(-)"
                }
                error={!!errors.RUT_USUARIO}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Correo electrónico"
                value={formData.EMAIL_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, EMAIL_USUARIO: e.target.value })
                }
                fullWidth
                margin="normal"
                required
                helperText={
                  !formData.EMAIL_USUARIO
                    ? "El correo electrónico es obligatorio."
                    : ""
                }
              />
              <TextField
                label="Contraseña"
                type="password"
                value={formData.CONTRASENIA_USUARIO}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CONTRASENIA_USUARIO: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                required
                helperText={
                  !formData.CONTRASENIA_USUARIO
                    ? "La contraseña es obligatoria."
                    : ""
                }
              />
              <TextField
                label=""
                type="date"
                value={formData.FECHA_NACIMIENTO_USUARIO}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    FECHA_NACIMIENTO_USUARIO: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                required
                helperText={
                  !formData.FECHA_NACIMIENTO_USUARIO
                    ? "La fecha de nacimiento es obligatoria."
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                value={formData.ROL_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, ROL_USUARIO: e.target.value })
                }
              >
                {roles.map((role) => (
                  <MenuItem key={role.ID_ROL} value={role.ID_ROL}>
                    {role.NOMBRE_ROL}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-actions">
            <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserFormModal;
