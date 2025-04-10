import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
  Box,
} from "@mui/material";
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
    codigo_cliente: "",
    nombre_razon_social: "",
    nombre_fantasia: "",
    rut: "",
    giro: "",
    direccion: "",
    ciudad: "",
    comuna: "",
    contacto_comercial: {
      contacto_comercial: "",
      correo_electronico_comercial: "",
      telefono_fijo: "",
      telefono_celular: "",
    },
    informacion_de_pago: {
      nombre_responsable: "",
      correo_electronico: "",
      telefono_responsable: "",
    },
  });

  const [errors, setErrors] = useState({
    codigo_cliente: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (clienteData) {
      setFormData({
        codigo_cliente: clienteData.codigo_cliente || "",
        nombre_razon_social: clienteData.nombre_razon_social || "",
        nombre_fantasia: clienteData.nombre_fantasia || "",
        rut: clienteData.rut || "",
        giro: clienteData.giro || "",
        direccion: clienteData.direccion || "",
        ciudad: clienteData.ciudad || "",
        comuna: clienteData.comuna || "",
        contacto_comercial: clienteData.contacto_comercial || {
          contacto_comercial: "",
          correo_electronico_comercial: "",
          telefono_fijo: "",
          telefono_celular: "",
        },
        informacion_de_pago: clienteData.informacion_de_pago || {
          nombre_responsable: "",
          correo_electronico: "",
          telefono_responsable: "",
        },
      });

      // Llamar a las API para obtener información adicional
      const fetchAdditionalData = async () => {
        try {
          const contacto = await getContactoComercial(clienteData.id_cliente);
          const infoPago = await getInformacionDePago(clienteData.id_cliente);

          setFormData((prevData) => ({
            ...prevData,
            contacto_comercial: contacto || prevData.contacto_comercial,
            informacion_de_pago: infoPago || prevData.informacion_de_pago,
          }));
        } catch (error) {
          console.error("Error obteniendo datos adicionales:", error);
        }
      };

      fetchAdditionalData();
    }
  }, [clienteData]);

  const formatRUT = (rut) => {
    let cleanedRUT = rut.replace(/[^0-9kK]/g, "").slice(0, 9);

    if (cleanedRUT.length <= 8) {
      cleanedRUT = cleanedRUT.replace(/(\d{1})(\d{3})(\d{3})/, "$1.$2.$3-");
    } else if (cleanedRUT.length === 9) {
      cleanedRUT = cleanedRUT.replace(
        /(\d{2})(\d{3})(\d{3})(\d{1}|k|K)/,
        "$1.$2.$3-$4"
      );
    } else {
      cleanedRUT = cleanedRUT.substring(0, 9);
    }

    return cleanedRUT;
  };

  const handleRUTChange = (e) => {
    let value = e.target.value;
    let onlyValidChars = value.replace(/[^0-9kK.-]/g, "");
    const onlyNumbersAndK = onlyValidChars.replace(/[^0-9kK]/g, "");

    if (onlyValidChars.length !== value.length) {
      setErrors({
        ...errors,
        rut: "Solo se permiten números, puntos, guiones y la letra 'k'.",
      });
    } else {
      setErrors({ ...errors, rut: "" });
    }

    let formattedRUT = formatRUT(onlyNumbersAndK);

    if (
      formattedRUT.endsWith("-") &&
      e.target.value.length < formData.rut.length
    ) {
      formattedRUT = formattedRUT.slice(0, -1);
    }

    setFormData({ ...formData, rut: formattedRUT });
  };

  const validateCodigoCliente = (value) => /^[A-Za-z0-9]+$/.test(value);
  const validateNombreRazonSocial = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateNombreFantasia = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateGiro = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateDireccion = (value) => /^[A-Za-z0-9.#\s]+$/.test(value);
  const validateCiudad = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateComuna = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateContactoComercial = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateCorreo = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const validateNombreResponsable = (value) =>
    /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);

  const handleCodigoClienteChange = (e) => {
    const { value } = e.target;
    if (validateCodigoCliente(value) || value === "") {
      setFormData({ ...formData, codigo_cliente: value });
      setErrors({ ...errors, codigo_cliente: "" });
    } else {
      setErrors({
        ...errors,
        codigo_cliente: "Solo se permiten letras y números.",
      });
    }
  };

  const handleNombreRazonSocialChange = (e) => {
    const { value } = e.target;
    if (validateNombreRazonSocial(value) || value === "") {
      setFormData({ ...formData, nombre_razon_social: value });
      setErrors({ ...errors, nombre_razon_social: "" });
    } else {
      setErrors({
        ...errors,
        nombre_razon_social: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleNombreChange = (e) => {
    const { value } = e.target;
    if (validateNombreFantasia(value) || value === "") {
      setFormData({ ...formData, nombre_fantasia: value });
      setErrors({ ...errors, nombre_fantasia: "" });
    } else {
      setErrors({
        ...errors,
        nombre_fantasia: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleGiroChange = (e) => {
    const { value } = e.target;
    if (validateGiro(value) || value === "") {
      setFormData({ ...formData, giro: value });
      setErrors({ ...errors, giro: "" });
    } else {
      setErrors({ ...errors, giro: "Solo se permiten letras y espacios." });
    }
  };

  const handleDireccionChange = (e) => {
    const { value } = e.target;
    if (validateDireccion(value) || value === "") {
      setFormData({ ...formData, direccion: value });
      setErrors({ ...errors, direccion: "" });
    } else {
      setErrors({
        ...errors,
        direccion: "Solo se permiten letras, números, puntos, # y espacios.",
      });
    }
  };

  const handleCiudadChange = (e) => {
    const { value } = e.target;
    if (validateCiudad(value) || value === "") {
      setFormData({ ...formData, ciudad: value });
      setErrors({ ...errors, ciudad: "" });
    } else {
      setErrors({ ...errors, ciudad: "Solo se permiten letras y espacios." });
    }
  };

  const handleComunaChange = (e) => {
    const { value } = e.target;
    if (validateComuna(value) || value === "") {
      setFormData({ ...formData, comuna: value });
      setErrors({ ...errors, comuna: "" });
    } else {
      setErrors({ ...errors, comuna: "Solo se permiten letras y espacios." });
    }
  };

  const handleContactoChange = (e) => {
    const { value } = e.target;
    if (validateContactoComercial(value) || value === "") {
      setFormData({
        ...formData,
        contacto_comercial: {
          ...formData.contacto_comercial,
          contacto_comercial: value,
        },
      });
      setErrors({ ...errors, contacto_comercial: "" });
    } else {
      setErrors({
        ...errors,
        contacto_comercial: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleCorreoChange = (e) => {
    const { value } = e.target;
    const isValid = validateCorreo(value) || value === "";
    setFormData((prevData) => ({
      ...prevData,
      contacto_comercial: {
        ...prevData.contacto_comercial,
        correo_electronico_comercial: value,
      },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      correo_electronico_comercial: isValid
        ? ""
        : "Por favor ingresa un correo electrónico válido.",
    }));
  };

  const formatTelefono = (value) => {
    let numericValue = value.replace(/\D/g, "").slice(0, 9);
    if (numericValue.length > 1) {
      return `${numericValue[0]} ${numericValue.slice(1)}`;
    }
    return numericValue;
  };

  const handleTelefonoFijoChange = (e) => {
    let formattedValue = formatTelefono(e.target.value);
    const isValid =
      formattedValue.replace(/\s/g, "").length === 9 &&
      formattedValue[0] === "2";

    setFormData((prevData) => ({
      ...prevData,
      contacto_comercial: {
        ...prevData.contacto_comercial,
        telefono_fijo: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      telefono_fijo: isValid
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
      contacto_comercial: {
        ...prevData.contacto_comercial,
        telefono_celular: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      telefono_celular: isValid
        ? ""
        : "El celular debe empezar con '9' y contener exactamente 9 dígitos numéricos.",
    }));
  };

  const handleNombreResponsableChange = (e) => {
    const { value } = e.target;
    if (validateNombreResponsable(value) || value === "") {
      setFormData({
        ...formData,
        informacion_de_pago: {
          ...formData.informacion_de_pago,
          nombre_responsable: value,
        },
      });
      setErrors({ ...errors, nombre_responsable: "" });
    } else {
      setErrors({
        ...errors,
        nombre_responsable: "Solo se permiten letras y espacios.",
      });
    }
  };

  const handleCorreoResponsableChange = (e) => {
    const { value } = e.target;
    const isValid = validateCorreo(value) || value === "";

    setFormData((prevData) => ({
      ...prevData,
      informacion_de_pago: {
        ...prevData.informacion_de_pago,
        correo_electronico: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      correo_electronico: isValid
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
      informacion_de_pago: {
        ...prevData.informacion_de_pago,
        telefono_responsable: formattedValue,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      telefono_responsable: isValid
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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          width: { xs: "90%", sm: 800 },
          maxWidth: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>
          {editing
            ? "Formulario para editar Cliente"
            : "Formulario para crear Cliente"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Datos del Cliente */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Cliente"
                name="codigo_cliente"
                value={formData.codigo_cliente}
                onChange={handleCodigoClienteChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.codigo_cliente || "El Código cliente es obligatorio."
                }
                error={!!errors.codigo_cliente}
              />
              <TextField
                label="Razón Social"
                name="nombre_razon_social"
                value={formData.nombre_razon_social}
                onChange={handleNombreRazonSocialChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.nombre_razon_social ||
                  "La Razón Social es obligatoria."
                }
                error={!!errors.nombre_razon_social}
              />
              <TextField
                label="Nombre Fantasía"
                name="nombre_fantasia"
                value={formData.nombre_fantasia}
                onChange={handleNombreChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.nombre_fantasia || "El Nombre Fantasía es obligatorio."
                }
                error={!!errors.nombre_fantasia}
              />
              <TextField
                label="RUT"
                name="rut"
                value={formData.rut}
                onChange={handleRUTChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.rut ||
                  "Por favor ingrese su RUT sin punto(.) y guión(-)"
                }
                error={!!errors.rut}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Giro"
                name="giro"
                value={formData.giro}
                onChange={handleGiroChange}
                fullWidth
                margin="normal"
                required
                helperText={errors.giro || "El Giro es obligatorio."}
                error={!!errors.giro}
              />
              <TextField
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleDireccionChange}
                fullWidth
                margin="normal"
                required
                helperText={errors.direccion || "La Dirección es obligatoria."}
                error={!!errors.direccion}
              />
              <TextField
                label="Ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleCiudadChange}
                fullWidth
                margin="normal"
                required
                helperText={errors.ciudad || "La Ciudad es obligatoria."}
                error={!!errors.ciudad}
              />
              <TextField
                label="Comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleComunaChange}
                fullWidth
                margin="normal"
                required
                helperText={errors.comuna || "La Comuna es obligatoria."}
                error={!!errors.comuna}
              />
            </Grid>

            {/* Información de Pago y Contacto Comercial */}
            <Grid item xs={12} sm={6}>
              <h3>Contacto Comercial</h3>
              <TextField
                label="Contacto Comercial"
                name="contacto_comercial"
                value={formData.contacto_comercial.contacto_comercial}
                onChange={handleContactoChange}
                fullWidth
                margin="normal"
                helperText={errors.contacto_comercial}
                error={!!errors.contacto_comercial}
              />
              <TextField
                label="Correo Electrónico"
                name="correo_electronico_comercial"
                value={formData.contacto_comercial.correo_electronico_comercial}
                onChange={handleCorreoChange}
                fullWidth
                margin="normal"
                helperText={errors.correo_electronico_comercial}
                error={!!errors.correo_electronico_comercial}
              />
              <TextField
                label="Teléfono Fijo"
                name="telefono_fijo"
                value={formData.contacto_comercial.telefono_fijo}
                onChange={handleTelefonoFijoChange}
                fullWidth
                margin="normal"
                helperText={errors.telefono_fijo}
                error={!!errors.telefono_fijo}
              />
              <TextField
                label="Teléfono Celular"
                name="telefono_celular"
                value={formData.contacto_comercial.telefono_celular}
                onChange={handleTelefonoCelularChange}
                fullWidth
                margin="normal"
                helperText={errors.telefono_celular}
                error={!!errors.telefono_celular}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <h3>Información de Pago</h3>
              <TextField
                label="Nombre Responsable"
                name="nombre_responsable"
                value={formData.informacion_de_pago.nombre_responsable}
                onChange={handleNombreResponsableChange}
                fullWidth
                margin="normal"
                helperText={errors.nombre_responsable}
                error={!!errors.nombre_responsable}
              />
              <TextField
                label="Correo Electrónico"
                name="correo_electronico"
                value={formData.informacion_de_pago.correo_electronico}
                onChange={handleCorreoResponsableChange}
                fullWidth
                margin="normal"
                helperText={errors.correo_electronico}
                error={!!errors.correo_electronico}
              />
              <TextField
                label="Teléfono Responsable"
                name="telefono_responsable"
                value={formData.informacion_de_pago.telefono_responsable}
                onChange={handleTelefonoChange}
                fullWidth
                margin="normal"
                helperText={errors.telefono_responsable}
                error={!!errors.telefono_responsable}
              />
            </Grid>
          </Grid>

          {/* Botón de Envío */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              width: { xs: "100%", sm: "auto" }, // Ajuste de ancho en pantallas pequeñas
            }}
          >
            {editing ? "Editar Cliente" : "Crear Cliente"}
          </Button>
        </form>

        {/* Snackbar para errores generales */}
        {errors.generales && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              {errors.generales}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Modal>
  );
};

export default ClienteFormModal;
