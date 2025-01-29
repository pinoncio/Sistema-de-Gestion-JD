import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Snackbar, Alert } from "@mui/material";
import "../Styles/FormUser.css";

const ClienteFormModal = ({
  open,
  onClose,
  onSubmit,
  clienteData,
  editing,
  setEditing,
  setEditId,
}) => {
  const [formData, setFormData] = useState({
    CODIGO_CLIENTE: "",
    NOMBRE_RAZON_SOCIAL: "",
    NOMBRE_FANTASIA: "",
    RUT: "",
    GIRO: "",
    DIRECCION: "",
    CIUDAD: "",
    COMUNA: "",
  });

  const [errors, setErrors] = useState({
    CODIGO_CLIENTE: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (clienteData) {
      setFormData({
        CODIGO_CLIENTE: clienteData.CODIGO_CLIENTE || "",
        NOMBRE_RAZON_SOCIAL: clienteData.NOMBRE_RAZON_SOCIAL || "",
        NOMBRE_FANTASIA: clienteData.NOMBRE_FANTASIA || "",
        RUT: clienteData.RUT || "",
        GIRO: clienteData.GIRO || "",
        DIRECCION: clienteData.DIRECCION || "",
        CIUDAD: clienteData.CIUDAD || "",
        COMUNA: clienteData.COMUNA || "",
      });
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
      });
    }
  }, [clienteData]);

  const validateName = (value) => {
    // Modificado para permitir letras y puntos
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s.]+$/;
    return regex.test(value);
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]: "Solo se permiten letras, espacios y puntos.",
      });
    }
  };

  const formatRUT = (rut) => {
    let cleanedRUT = rut.replace(/[^0-9kK]/g, "").slice(0, 9); // Permite números y "k" o "K" al final

    if (cleanedRUT.length <= 8) {
      cleanedRUT = cleanedRUT.replace(/(\d{1})(\d{3})(\d{3})/, "$1.$2.$3-");
    } else if (cleanedRUT.length === 9) {
      cleanedRUT = cleanedRUT.replace(
        /(\d{2})(\d{3})(\d{3})(\d{1}|k|K)/,
        "$1.$2.$3-$4"
      );
    } else {
      cleanedRUT = cleanedRUT.substring(0, 9); // Limitar a 9 caracteres
    }

    return cleanedRUT;
  };

  const handleRUTChange = (e) => {
    let value = e.target.value;
    let onlyValidChars = value.replace(/[^0-9kK.-]/g, ""); // Permite números, ".", "-", "k", "K"
    const onlyNumbersAndK = onlyValidChars.replace(/[^0-9kK]/g, ""); // Limpia todo menos números y "k/K"

    if (onlyValidChars.length !== value.length) {
      setErrors({
        ...errors,
        RUT: "Solo se permiten números, puntos, guiones y la letra 'k'.",
      });
    } else {
      setErrors({ ...errors, RUT: "" });
    }

    let formattedRUT = formatRUT(onlyNumbersAndK);

    if (
      formattedRUT.endsWith("-") &&
      e.target.value.length < formData.RUT.length
    ) {
      formattedRUT = formattedRUT.slice(0, -1);
    }

    setFormData({ ...formData, RUT: formattedRUT });
  };



  // Función para validar el campo CODIGO_CLIENTE
  const validateCodigoCliente = (value) => {
    // Permite letras, números y guiones, pero no números negativos ni símbolos especiales.
    const regex = /^[A-Za-z0-9-]+$/;
    return regex.test(value);
  };

  // Actualización en el manejo de cambios de CODIGO_CLIENTE
  const handleCodigoClienteChange = (e) => {
    const { value } = e.target;

    // Validamos si el valor cumple con la expresión regular
    if (validateCodigoCliente(value) || value === "") {
      setFormData({ ...formData, CODIGO_CLIENTE: value });
      setErrors({ ...errors, CODIGO_CLIENTE: "" });
    } else {
      setErrors({
        ...errors,
        CODIGO_CLIENTE: "Solo se permiten letras, números y guiones.",
      });
    }
  };

  const validateNombreFantasía = (value) => {
    // Permite solo letras (mayúsculas, minúsculas) y espacios
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const handleNombreFantasíaChange = (e) => {
    const { value } = e.target;
    if (validateNombreFantasía(value) || value === "") {
      setFormData({ ...formData, NOMBRE_FANTASIA: value });
      setErrors({ ...errors, NOMBRE_FANTASIA: "" });
    } else {
      setErrors({
        ...errors,
        NOMBRE_FANTASIA: "Solo se permiten letras y espacios.",
      });
    }
  };

  const validateGiro = (value) => {
    // Permite solo letras y espacios
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const handleGiroChange = (e) => {
    const { value } = e.target;
    if (validateGiro(value) || value === "") {
      setFormData({ ...formData, GIRO: value });
      setErrors({ ...errors, GIRO: "" });
    } else {
      setErrors({
        ...errors,
        GIRO: "Solo se permiten letras y espacios.",
      });
    }
  };

  const validateDireccion = (value) => {
    // Permite letras, números, espacios, comas, puntos y #
    const regex = /^[A-Za-z0-9\s,.#]+$/;
    return regex.test(value);
  };

  const handleDireccionChange = (e) => {
    const { value } = e.target;
    if (validateDireccion(value) || value === "") {
      setFormData({ ...formData, DIRECCION: value });
      setErrors({ ...errors, DIRECCION: "" });
    } else {
      setErrors({
        ...errors,
        DIRECCION:
          "La dirección solo puede contener letras, números, comas, puntos y el símbolo #.",
      });
    }
  };

  const validateCiudad = (value) => {
    // Permite solo letras (mayúsculas, minúsculas) y espacios
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const handleCiudadChange = (e) => {
    const { value } = e.target;
    if (validateCiudad(value) || value === "") {
      setFormData({ ...formData, CIUDAD: value });
      setErrors({ ...errors, CIUDAD: "" });
    } else {
      setErrors({
        ...errors,
        CIUDAD: "Solo se permiten letras y espacios.",
      });
    }
  };

  const validateComuna = (value) => {
    // Permite solo letras y espacios
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const handleComunaChange = (e) => {
    const { value } = e.target;
    if (validateComuna(value) || value === "") {
      setFormData({ ...formData, COMUNA: value });
      setErrors({ ...errors, COMUNA: "" });
    } else {
      setErrors({
        ...errors,
        COMUNA: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    let hasError = false;

    // Verificar si los campos obligatorios están llenos
    if (
      !lowerCaseFormData.codigo_cliente ||
      !lowerCaseFormData.nombre_razon_social ||
      !lowerCaseFormData.rut ||
      !lowerCaseFormData.giro ||
      !lowerCaseFormData.direccion ||
      !lowerCaseFormData.ciudad ||
      !lowerCaseFormData.comuna
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      await onSubmit(lowerCaseFormData);
      onClose();
    } catch (error) {
      console.error("Error al crear/actualizar cliente:", error);
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>
          {editing
            ? "Formulario para editar Cliente"
            : "Formulario para crear Cliente"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <TextField
                label="Código Cliente"
                value={formData.CODIGO_CLIENTE}
                onChange={handleCodigoClienteChange} // Cambié el manejador de cambios
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.CODIGO_CLIENTE ||
                  (!formData.CODIGO_CLIENTE
                    ? "El Código cliente es obligatorio."
                    : " ")
                }
                error={!!errors.CODIGO_CLIENTE}
              />

              <TextField
                label="Razón Social"
                value={formData.NOMBRE_RAZON_SOCIAL}
                onChange={(e) => handleNameChange(e, "NOMBRE_RAZON_SOCIAL")} // Usamos handleNameChange aquí
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.NOMBRE_RAZON_SOCIAL ||
                  (!formData.NOMBRE_RAZON_SOCIAL
                    ? "La Razón Social es obligatoria."
                    : " ")
                }
                error={!!errors.NOMBRE_RAZON_SOCIAL}
              />

              <TextField
                label="Nombre Fantasía"
                value={formData.NOMBRE_FANTASIA}
                onChange={handleNombreFantasíaChange} // Usamos la función de validación aquí
                fullWidth
                margin="normal"
                helperText={
                  errors.NOMBRE_FANTASIA ||
                  (!formData.NOMBRE_FANTASIA
                    ? "El Nombre Fantasía es obligatorio."
                    : " ")
                }
                error={!!errors.NOMBRE_FANTASIA}
              />

              <TextField
                label="RUT"
                value={formData.RUT}
                onChange={handleRUTChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.RUT ||
                  "Por favor ingrese su RUT sin punto(.) y guión(-)"
                }
                error={!!errors.RUT}
              />
              <TextField
                label="Giro"
                value={formData.GIRO}
                onChange={handleGiroChange} // Usa el manejador de cambios aquí
                fullWidth
                margin="normal"
                helperText={
                  errors.GIRO ||
                  (!formData.GIRO ? "El Giro es obligatorio." : " ")
                }
                error={!!errors.GIRO}
              />

              <TextField
                label="Dirección"
                value={formData.DIRECCION}
                onChange={handleDireccionChange} // Usamos el nuevo manejador de cambios
                fullWidth
                margin="normal"
                helperText={
                  errors.DIRECCION ||
                  (!formData.DIRECCION ? "La Dirección es obligatoria." : " ")
                }
                error={!!errors.DIRECCION}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Ciudad"
                value={formData.CIUDAD}
                onChange={handleCiudadChange} // Usamos el manejador de cambios aquí
                fullWidth
                margin="normal"
                helperText={
                  errors.CIUDAD ||
                  (!formData.CIUDAD ? "La Ciudad es obligatoria." : " ")
                }
                error={!!errors.CIUDAD}
              />

              <TextField
                label="Comuna"
                value={formData.COMUNA}
                onChange={handleComunaChange} // Usamos el manejador de cambios aquí
                fullWidth
                margin="normal"
                helperText={
                  errors.COMUNA ||
                  (!formData.COMUNA ? "La Comuna es obligatoria." : " ")
                }
                error={!!errors.COMUNA}
              />
            </div>
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

export default ClienteFormModal;
