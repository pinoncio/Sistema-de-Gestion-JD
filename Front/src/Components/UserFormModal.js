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

  const [openSnackbar, setOpenSnackbar] = useState(false);

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
        RUT_USUARIO: "Solo se permiten números, puntos y guiones.",
      });
    } else {
      setErrors({ ...errors, RUT_USUARIO: "" });
    }

    let formattedRUT = formatRUT(onlyNumbers);

    if (
      formattedRUT.endsWith("-") &&
      e.target.value.length < formData.RUT_USUARIO.length
    ) {
      formattedRUT = formattedRUT.slice(0, -1);
    }

    setFormData({ ...formData, RUT_USUARIO: formattedRUT });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    if (!validateEmail(lowerCaseFormData.email_usuario)) {
      setErrors({
        ...errors,
        EMAIL_USUARIO: "El correo electrónico no es válido.",
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
        CONTRASENIA_USUARIO:
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
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setFormData({
                    ...formData,
                    CONTRASENIA_USUARIO: newPassword,
                  });

                  // Verificar longitud de la contraseña
                  if (newPassword.length < 8) {
                    setErrors({
                      ...errors,
                      CONTRASENIA_USUARIO:
                        "La contraseña debe tener un mínimo de 8 caracteres.",
                    });
                  } else {
                    // Si tiene más de 8 caracteres, eliminar el mensaje de error
                    setErrors({
                      ...errors,
                      CONTRASENIA_USUARIO: "",
                    });
                  }
                }}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.CONTRASENIA_USUARIO ||
                  (!formData.CONTRASENIA_USUARIO
                    ? "La contraseña es obligatoria."
                    : "")
                }
                error={!!errors.CONTRASENIA_USUARIO}
              />

              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={formData.FECHA_NACIMIENTO_USUARIO}
                onChange={(e) => {
                  const inputDate = e.target.value;
                  const maxDate = getMaxDate();
                  if (inputDate > maxDate) {
                    setErrors({
                      ...errors,
                      FECHA_NACIMIENTO_USUARIO:
                        "La fecha no puede ser mayor al 24 de diciembre de 2024.",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      FECHA_NACIMIENTO_USUARIO: "",
                    });
                    setFormData({
                      ...formData,
                      FECHA_NACIMIENTO_USUARIO: inputDate,
                    });
                  }
                }}
                fullWidth
                margin="normal"
                required
                max={getMaxDate()} // Aplica la fecha máxima
                helperText={errors.FECHA_NACIMIENTO_USUARIO || ""}
                error={!!errors.FECHA_NACIMIENTO_USUARIO}
                InputProps={{
                  // Estilos para mostrar el campo en gris y deshabilitado si hay error
                  inputProps: {
                    style: {
                      color: errors.FECHA_NACIMIENTO_USUARIO ? "gray" : "black",
                      pointerEvents: errors.FECHA_NACIMIENTO_USUARIO
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
