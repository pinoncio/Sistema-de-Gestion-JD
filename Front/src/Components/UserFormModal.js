import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

import "../Styles/FormUser.css";

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
    nombre_usuario: "",
    apellido_usuario: "",
    rut_usuario: "",
    email_usuario: "",
    contrasenia_usuario: "",
    fecha_nacimiento_usuario: "",
    rol_usuario: "",
  });

  const [errors, setErrors] = useState({
    nombre_usuario: "",
    apellido_usuario: "",
    rut_usuario: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        nombre_usuario: userData.nombre_usuario || "",
        apellido_usuario: userData.apellido_usuario || "",
        rut_usuario: userData.rut_usuario || "",
        email_usuario: userData.email_usuario || "",
        contrasenia_usuario: userData.contrasenia_usuario || "",
        fecha_nacimiento_usuario: userData.fecha_nacimiento_usuario || "",
        rol_usuario: userData.rol_usuario || "",
      });
    } else {
      setFormData({
        nombre_usuario: "",
        apellido_usuario: "",
        rut_usuario: "",
        email_usuario: "",
        contrasenia_usuario: "",
        fecha_nacimiento_usuario: "",
        rol_usuario: "",
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

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() - 1);
    return maxDate.toISOString().split("T")[0];
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
    let onlyValidChars = value.replace(/[^0-9.-]/g, "");
    const onlyNumbers = onlyValidChars.replace(/[^\d]/g, "");
    if (onlyValidChars.length !== value.length) {
      setErrors({
        ...errors,
        rut_usuario: "Solo se permiten números, puntos y guiones.",
      });
    } else {
      setErrors({ ...errors, rut_usuario: "" });
    }

    let formattedRUT = formatRUT(onlyNumbers);

    if (
      formattedRUT.endsWith("-") &&
      e.target.value.length < formData.rut_usuario.length
    ) {
      formattedRUT = formattedRUT.slice(0, -1);
    }

    setFormData({ ...formData, rut_usuario: formattedRUT });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    if (!validateEmail(lowerCaseFormData.email_usuario)) {
      setErrors({
        ...errors,
        email_usuario: "El correo electrónico no es válido.",
      });
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

    if (lowerCaseFormData.contrasenia_usuario.length < 8) {
      setOpenSnackbar(true); // Mostrar Snackbar si la contraseña es corta
      setErrors({
        ...errors,
        contrasenia_usuario:
          "La contraseña debe tener un mínimo de 8 caracteres.",
      });
      return;
    }

    try {
      await onSubmit(lowerCaseFormData);
      onClose();
      setEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error al crear/actualizar usuario:", error);
      if (error.response && error.response.data) {
        setErrors({
          ...errors,
          GENERALES: error.response.data.message || "Ha ocurrido un error.",
        });
      } else {
        setErrors({
          ...errors,
          GENERALES: "Ha ocurrido un error. Intente nuevamente.",
        });
      }
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
                value={formData.nombre_usuario}
                onChange={(e) => handleNameChange(e, "nombre_usuario")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.nombre_usuario ||
                  (!formData.nombre_usuario ? "El nombre es obligatorio." : "")
                }
                error={!!errors.nombre_usuario}
              />
              <TextField
                label="Apellido"
                value={formData.apellido_usuario}
                onChange={(e) => handleNameChange(e, "apellido_usuario")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.apellido_usuario ||
                  (!formData.apellido_usuario
                    ? "El apellido es obligatorio."
                    : "")
                }
                error={!!errors.apellido_usuario}
              />
              <TextField
                label="Rut"
                value={formData.rut_usuario}
                onChange={handleRUTChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.rut_usuario ||
                  "Por favor ingrese su RUT sin punto(.) y guión(-)"
                }
                error={!!errors.rut_usuario}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Correo electrónico"
                value={formData.email_usuario}
                onChange={(e) =>
                  setFormData({ ...formData, email_usuario: e.target.value })
                }
                fullWidth
                margin="normal"
                required
                helperText={
                  !formData.email_usuario
                    ? "El correo electrónico es obligatorio."
                    : ""
                }
              />
              <TextField
                label="Contraseña"
                type="password"
                value={formData.contrasenia_usuario}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setFormData({
                    ...formData,
                    contrasenia_usuario: newPassword,
                  });

                  // Verificar longitud de la contraseña
                  if (newPassword.length < 8) {
                    setErrors({
                      ...errors,
                      contrasenia_usuario:
                        "La contraseña debe tener un mínimo de 8 caracteres.",
                    });
                  } else {
                    // Si tiene más de 8 caracteres, eliminar el mensaje de error
                    setErrors({
                      ...errors,
                      contrasenia_usuario: "",
                    });
                  }
                }}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.contrasenia_usuario ||
                  (!formData.contrasenia_usuario
                    ? "La contraseña es obligatoria."
                    : "")
                }
                error={!!errors.contrasenia_usuario}
              />

              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={formData.fecha_nacimiento_usuario}
                onChange={(e) => {
                  const inputDate = e.target.value;
                  const maxDate = getMaxDate();
                  if (inputDate > maxDate) {
                    setErrors({
                      ...errors,
                      fecha_nacimiento_usuario:
                        "La fecha no puede ser mayor al 24 de diciembre de 2024.",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      fecha_nacimiento_usuario: "",
                    });
                    setFormData({
                      ...formData,
                      fecha_nacimiento_usuario: inputDate,
                    });
                  }
                }}
                fullWidth
                margin="normal"
                required
                max={getMaxDate()} // Aplica la fecha máxima
                helperText={errors.fecha_nacimiento_usuario || ""}
                error={!!errors.fecha_nacimiento_usuario}
                InputProps={{
                  // Estilos para mostrar el campo en gris y deshabilitado si hay error
                  inputProps: {
                    style: {
                      color: errors.fecha_nacimiento_usuario ? "gray" : "black",
                      pointerEvents: errors.fecha_nacimiento_usuario
                        ? "none"
                        : "auto",
                    },
                  },
                }}
                InputLabelProps={{
                  shrink: true, // Para mantener la etiqueta en la parte superior
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                value={formData.rol_usuario}
                onChange={(e) =>
                  setFormData({ ...formData, rol_usuario: e.target.value })
                }
              >
                {roles.map((role) => (
                  <MenuItem key={role.id_rol} value={role.id_rol}>
                    {role.nombre_rol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-actions">
            <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" onClose={handleSnackbarClose}>
              La contraseña debe tener al menos 8 caracteres.
            </Alert>
          </Snackbar>
        </form>
      </div>
    </Modal>
  );
};

export default UserFormModal;
