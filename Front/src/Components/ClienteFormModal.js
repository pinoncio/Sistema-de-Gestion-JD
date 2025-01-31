import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Snackbar, Alert, Grid } from "@mui/material";
import { getContactoComercial } from "../Services/contactoService";
import { getInformacionDePago } from "../Services/informacionService";
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
    CONTACTO_COMERCIAL: {
      CONTACTO_COMERCIAL: "",
      CORREO_ELECTRONICO_COMERCIAL: "",
      TELEFONO_FIJO: "",
      TELEFONO_CELULAR: "",
    },
    INFORMACION_DE_PAGO: {
      NOMBRE_RESPONSABLE: "",
      CORREO_ELECTRONICO: "",
      TELEFONO_RESPONSABLE: "",
    },
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
        CONTACTO_COMERCIAL: clienteData.CONTACTO_COMERCIAL || {
          CONTACTO_COMERCIAL: "",
          CORREO_ELECTRONICO_COMERCIAL: "",
          TELEFONO_FIJO: "",
          TELEFONO_CELULAR: "",
        },
        INFORMACION_DE_PAGO: clienteData.INFORMACION_DE_PAGO || {
          NOMBRE_RESPONSABLE: "",
          CORREO_ELECTRONICO: "",
          TELEFONO_RESPONSABLE: "",
        },
      });

      // Llamar a las API para obtener información adicional
      const fetchAdditionalData = async () => {
        try {
          const contacto = await getContactoComercial(clienteData.ID_CLIENTE);
          const infoPago = await getInformacionDePago(clienteData.ID_CLIENTE);

          setFormData((prevData) => ({
            ...prevData,
            CONTACTO_COMERCIAL: contacto || prevData.CONTACTO_COMERCIAL,
            INFORMACION_DE_PAGO: infoPago || prevData.INFORMACION_DE_PAGO,
          }));
        } catch (error) {
          console.error("Error obteniendo datos adicionales:", error);
        }
      };

      fetchAdditionalData();
    }
  }, [clienteData]);

  const handleInputChange = (e, field, section) => {
    const { name, value } = e.target;
    if (section) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [name]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
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

  const validateCodigoCliente = (value) => /^[A-Za-z0-9]+$/.test(value); // Solo letras y números
  const validateNombreRazonSocial = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value); // Solo letras y espacios
  const validateNombreFantasia = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateGiro = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value); // Solo letras y espacios
  const validateDireccion = (value) => /^[A-Za-z0-9.#\s]+$/.test(value); // Letras, números, puntos, # y espacios
  const validateCiudad = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value); // Solo letras y espacios
  const validateComuna = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value); // Solo letras y espacios
  const validateContactoComercial = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateCorreo = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const validateNombreResponsable = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);

  const handleCodigoClienteChange = (e) => {
    const { value } = e.target;
    if (validateCodigoCliente(value) || value === "") {
      setFormData({ ...formData, CODIGO_CLIENTE: value });
      setErrors({ ...errors, CODIGO_CLIENTE: "" });
    } else {
      setErrors({
        ...errors,
        CODIGO_CLIENTE: "Solo se permiten letras y números.",
      });
    }
  };

  const handleNombreRazonSocialChange = (e) => {
    const { value } = e.target;
    if (validateNombreRazonSocial(value) || value === "") {
      setFormData({ ...formData, NOMBRE_RAZON_SOCIAL: value });
      setErrors({ ...errors, NOMBRE_RAZON_SOCIAL: "" });
    } else {
      setErrors({
        ...errors,
        NOMBRE_RAZON_SOCIAL: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleNombreChange = (e) => {
    const { value } = e.target;
    if (validateNombreFantasia(value) || value === "") {
      setFormData({ ...formData, NOMBRE_FANTASIA: value });
      setErrors({ ...errors, NOMBRE_FANTASIA: "" });
    } else {
      setErrors({
        ...errors,
        NOMBRE_FANTASIA: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleGiroChange = (e) => {
    const { value } = e.target;
    if (validateGiro(value) || value === "") {
      setFormData({ ...formData, GIRO: value });
      setErrors({ ...errors, GIRO: "" });
    } else {
      setErrors({ ...errors, GIRO: "Solo se permiten letras y espacios." });
    }
  };

  const handleDireccionChange = (e) => {
    const { value } = e.target;
    if (validateDireccion(value) || value === "") {
      setFormData({ ...formData, DIRECCION: value });
      setErrors({ ...errors, DIRECCION: "" });
    } else {
      setErrors({
        ...errors,
        DIRECCION: "Solo se permiten letras, números, puntos, # y espacios.",
      });
    }
  };

  const handleCiudadChange = (e) => {
    const { value } = e.target;
    if (validateCiudad(value) || value === "") {
      setFormData({ ...formData, CIUDAD: value });
      setErrors({ ...errors, CIUDAD: "" });
    } else {
      setErrors({ ...errors, CIUDAD: "Solo se permiten letras y espacios." });
    }
  };

  const handleComunaChange = (e) => {
    const { value } = e.target;
    if (validateComuna(value) || value === "") {
      setFormData({ ...formData, COMUNA: value });
      setErrors({ ...errors, COMUNA: "" });
    } else {
      setErrors({ ...errors, COMUNA: "Solo se permiten letras y espacios." });
    }
  };

  const handleContactoChange = (e) => {
    const { value } = e.target;
    if (validateContactoComercial(value) || value === "") {
      setFormData({
        ...formData,
        CONTACTO_COMERCIAL: {
          ...formData.CONTACTO_COMERCIAL,
          CONTACTO_COMERCIAL: value,
        },
      });
      setErrors({ ...errors, CONTACTO_COMERCIAL: "" });
    } else {
      setErrors({
        ...errors,
        CONTACTO_COMERCIAL: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleCorreoChange = (e) => {
    const { value } = e.target;
    const isValid = validateCorreo(value) || value === "";

    setFormData((prevData) => ({
      ...prevData,
      CONTACTO_COMERCIAL: {
        ...prevData.CONTACTO_COMERCIAL,
        CORREO_ELECTRONICO_COMERCIAL: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      CORREO_ELECTRONICO_COMERCIAL: isValid
        ? ""
        : "Por favor ingresa un correo electrónico válido.",
    }));
  };

  const formatTelefono = (value) => {
    // Permitir solo números y limitar a 9 caracteres
    let numericValue = value.replace(/\D/g, "").slice(0, 9);

    // Aplicar el formato "X XXXXXXXX" si tiene al menos un dígito
    if (numericValue.length > 1) {
      return `${numericValue[0]} ${numericValue.slice(1)}`;
    }

    return numericValue;
  };

  const handleTelefonoFijoChange = (e) => {
    let formattedValue = formatTelefono(e.target.value);

    // Validar si el teléfono fijo empieza con "2" y tiene 9 dígitos
    const isValid =
      formattedValue.replace(/\s/g, "").length === 9 &&
      formattedValue[0] === "2";

    setFormData((prevData) => ({
      ...prevData,
      CONTACTO_COMERCIAL: {
        ...prevData.CONTACTO_COMERCIAL,
        TELEFONO_FIJO: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      TELEFONO_FIJO: isValid
        ? ""
        : "El teléfono fijo debe empezar con '2' y contener exactamente 9 dígitos numéricos.",
    }));
  };

  const handleTelefonoCelularChange = (e) => {
    let formattedValue = formatTelefono(e.target.value);

    // Validar si el teléfono celular empieza con "9" y tiene 9 dígitos
    const isValid =
      formattedValue.replace(/\s/g, "").length === 9 &&
      formattedValue[0] === "9";

    setFormData((prevData) => ({
      ...prevData,
      CONTACTO_COMERCIAL: {
        ...prevData.CONTACTO_COMERCIAL,
        TELEFONO_CELULAR: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      TELEFONO_CELULAR: isValid
        ? ""
        : "El celular debe empezar con '9' y contener exactamente 9 dígitos numéricos.",
    }));
  };

  const handleNombreResponsableChange = (e) => {
    const { value } = e.target;
    if (validateNombreResponsable(value) || value === "") {
      setFormData({
        ...formData,
        INFORMACION_DE_PAGO: {
          ...formData.INFORMACION_DE_PAGO,
          NOMBRE_RESPONSABLE: value,
        },
      });
      setErrors({ ...errors, NOMBRE_RESPONSABLE: "" });
    } else {
      setErrors({
        ...errors,
        NOMBRE_RESPONSABLE: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleCorreoResponsableChange = (e) => {
    const { value } = e.target;
    const isValid = validateCorreo(value) || value === "";

    setFormData((prevData) => ({
      ...prevData,
      INFORMACION_DE_PAGO: {
        ...prevData.INFORMACION_DE_PAGO,
        CORREO_ELECTRONICO: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      CORREO_ELECTRONICO: isValid
        ? ""
        : "Por favor ingresa un correo electrónico válido.",
    }));
  };

  const handleTelefonoChange = (e) => {
    let formattedValue = formatTelefono(e.target.value);

    // Validar si el teléfono celular empieza con "9" y tiene 9 dígitos
    const isValid =
      formattedValue.replace(/\s/g, "").length === 9 &&
      formattedValue[0] === "9";

    setFormData((prevData) => ({
      ...prevData,
      INFORMACION_DE_PAGO: {
        ...prevData.INFORMACION_DE_PAGO,
        TELEFONO_RESPONSABLE: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      TELEFONO_RESPONSABLE: isValid
        ? ""
        : "El celular debe empezar con '9' y contener exactamente 9 dígitos numéricos.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir los datos a minúsculas
    const lowerCaseData = { ...formData };

    // Función para convertir las claves a minúsculas
    const toLowerCase = (obj) => {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        const newKey = key.toLowerCase();
        if (typeof obj[key] === "object" && obj[key] !== null) {
          newObj[newKey] = toLowerCase(obj[key]); // Aplicar recursivamente
        } else {
          newObj[newKey] = obj[key];
        }
      });
      return newObj;
    };

    const finalData = toLowerCase(lowerCaseData); // Llamada a la función para convertir

    console.log(
      "Datos del formulario enviados:",
      JSON.stringify(finalData, null, 2)
    );

    let hasError = false;

    // Verificar si los campos obligatorios están llenos
    if (!finalData.rut) {
      setErrors({
        ...errors,
        RUT: "El RUT es obligatorio",
      });
      hasError = true;
    }

    if (
      !finalData.codigo_cliente ||
      !finalData.nombre_razon_social ||
      !finalData.rut ||
      !finalData.giro ||
      !finalData.direccion ||
      !finalData.ciudad ||
      !finalData.comuna
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      // Enviar los datos al backend
      await onSubmit(finalData); // Enviar los datos con claves en minúsculas
      onClose();
      setEditing(false);
      setEditId(null);
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
          {/* Contenedor principal para las secciones */}
          <Grid container spacing={0}>
            {/* Datos del Cliente */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Código Cliente"
                  name="CODIGO_CLIENTE"
                  value={formData.CODIGO_CLIENTE}
                  onChange={handleCodigoClienteChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={
                    errors.CODIGO_CLIENTE || "El Código cliente es obligatorio."
                  }
                  error={!!errors.CODIGO_CLIENTE}
                />
                <TextField
                  label="Razón Social"
                  name="NOMBRE_RAZON_SOCIAL"
                  value={formData.NOMBRE_RAZON_SOCIAL}
                  onChange={handleNombreRazonSocialChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={
                    errors.NOMBRE_RAZON_SOCIAL ||
                    "La Razón Social es obligatoria."
                  }
                  error={!!errors.NOMBRE_RAZON_SOCIAL}
                />
                <TextField
                  label="Nombre Fantasía"
                  name="NOMBRE_FANTASIA"
                  value={formData.NOMBRE_FANTASIA}
                  onChange={handleNombreChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={
                    errors.NOMBRE_FANTASIA ||
                    "El Nombre Fantasía es obligatorio."
                  }
                  error={!!errors.NOMBRE_FANTASIA}
                />
                <TextField
                  label="RUT"
                  name="RUT"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Giro"
                  name="GIRO"
                  value={formData.GIRO}
                  onChange={handleGiroChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={errors.GIRO || "El Giro es obligatorio."}
                  error={!!errors.GIRO}
                />
                <TextField
                  label="Dirección"
                  name="DIRECCION"
                  value={formData.DIRECCION}
                  onChange={handleDireccionChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={
                    errors.DIRECCION || "La Dirección es obligatoria."
                  }
                  error={!!errors.DIRECCION}
                />
                <TextField
                  label="Ciudad"
                  name="CIUDAD"
                  value={formData.CIUDAD}
                  onChange={handleCiudadChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={errors.CIUDAD || "La Ciudad es obligatoria."}
                  error={!!errors.CIUDAD}
                />
                <TextField
                  label="Comuna"
                  name="COMUNA"
                  value={formData.COMUNA}
                  onChange={handleComunaChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText={errors.COMUNA || "La Comuna es obligatoria."}
                  error={!!errors.COMUNA}
                />
              </Grid>
            </Grid>

            {/* Información de Pago y Contacto Comercial */}
            <Grid container item xs={12} spacing={3}>
              {/* Contacto Comercial */}
              <Grid item xs={12} sm={6}>
                <h3>Contacto Comercial</h3>
                <TextField
                  label="Contacto Comercial"
                  name="CONTACTO_COMERCIAL"
                  value={formData.CONTACTO_COMERCIAL.CONTACTO_COMERCIAL} // Asumiendo que CONTACTO_COMERCIAL es una cadena de texto
                  onChange={handleContactoChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.CONTACTO_COMERCIAL} // Asegúrate de que errors tenga la clave CONTACTO_COMERCIAL
                  error={!!errors.CONTACTO_COMERCIAL} // Compara con errors.CONTACTO_COMERCIAL
                />

                <TextField
                  label="Correo Electrónico"
                  name="CORREO_ELECTRONICO_COMERCIAL"
                  value={
                    formData.CONTACTO_COMERCIAL.CORREO_ELECTRONICO_COMERCIAL
                  }
                  onChange={handleCorreoChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.CORREO_ELECTRONICO_COMERCIAL}
                  error={!!errors.CORREO_ELECTRONICO_COMERCIAL}
                />

                <TextField
                  label="Teléfono Fijo"
                  name="TELEFONO_FIJO"
                  value={formData.CONTACTO_COMERCIAL.TELEFONO_FIJO}
                  onChange={handleTelefonoFijoChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.TELEFONO_FIJO}
                  error={!!errors.TELEFONO_FIJO}
                />
                <TextField
                  label="Teléfono Celular"
                  name="TELEFONO_CELULAR"
                  value={formData.CONTACTO_COMERCIAL.TELEFONO_CELULAR}
                  onChange={handleTelefonoCelularChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.TELEFONO_CELULAR}
                  error={!!errors.TELEFONO_CELULAR}
                />
              </Grid>

              {/* Información de Pago */}
              <Grid item xs={12} sm={6}>
                <h3>Información de Pago</h3>
                <TextField
                  label="Nombre Responsable"
                  name="NOMBRE_RESPONSABLE"
                  value={formData.INFORMACION_DE_PAGO.NOMBRE_RESPONSABLE}
                  onChange={handleNombreResponsableChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.NOMBRE_RESPONSABLE}
                  error={!!errors.NOMBRE_RESPONSABLE}
                />
                <TextField
                  label="Correo Electrónico"
                  name="CORREO_ELECTRONICO"
                  value={formData.INFORMACION_DE_PAGO.CORREO_ELECTRONICO}
                  onChange={handleCorreoResponsableChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.CORREO_ELECTRONICO}
                  error={!!errors.CORREO_ELECTRONICO}
                />
                <TextField
                  label="Teléfono Responsable"
                  name="TELEFONO_RESPONSABLE"
                  value={formData.INFORMACION_DE_PAGO.TELEFONO_RESPONSABLE}
                  onChange={handleTelefonoChange}
                  fullWidth
                  margin="normal"
                  helperText={errors.TELEFONO_RESPONSABLE}
                  error={!!errors.TELEFONO_RESPONSABLE}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Botón de Envío */}
          <Button type="submit" variant="contained" color="primary">
            {editing ? "Editar Cliente" : "Crear Cliente"}
          </Button>
        </form>

        {errors.GENERALES && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              {errors.GENERALES}
            </Alert>
          </Snackbar>
        )}
      </div>
    </Modal>
  );
};

export default ClienteFormModal;
