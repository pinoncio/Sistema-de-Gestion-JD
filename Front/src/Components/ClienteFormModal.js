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
      CORREO_ELECTRONICO: "",
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
          CORREO_ELECTRONICO: "",
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
          const contacto = await getContactoComercial(
            clienteData.ID_CLIENTE
          );
          const infoPago = await getInformacionDePago(
            clienteData.ID_CLIENTE
          );

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
          <Grid container spacing={3}>
            {/* Datos del Cliente */}
            <Grid item xs={12} sm={4}>
              <h3>Datos del Cliente</h3>
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
                  errors.NOMBRE_FANTASIA || "El Nombre Fantasía es obligatorio."
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
                helperText={errors.DIRECCION || "La Dirección es obligatoria."}
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

            {/* Contacto Comercial */}
            <Grid item xs={12} sm={4}>
              <h3>Contacto Comercial</h3>
              <TextField
                label="Contacto Comercial"
                name="CONTACTO_COMERCIAL"
                value={formData.CONTACTO_COMERCIAL.CONTACTO_COMERCIAL}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "CONTACTO_COMERCIAL",
                    "CONTACTO_COMERCIAL"
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Correo Electrónico"
                name="CORREO_ELECTRONICO_COMERCIAL"
                value={formData.CONTACTO_COMERCIAL?.CORREO_ELECTRONICO_COMERCIAL || ""}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "CORREO_ELECTRONICO_COMERCIAL",
                    "CONTACTO_COMERCIAL"
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono Fijo"
                name="TELEFONO_FIJO"
                value={formData.CONTACTO_COMERCIAL.TELEFONO_FIJO}
                onChange={(e) =>
                  handleInputChange(e, "TELEFONO_FIJO", "CONTACTO_COMERCIAL")
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono Celular"
                name="TELEFONO_CELULAR"
                value={formData.CONTACTO_COMERCIAL.TELEFONO_CELULAR}
                onChange={(e) =>
                  handleInputChange(e, "TELEFONO_CELULAR", "CONTACTO_COMERCIAL")
                }
                fullWidth
                margin="normal"
              />
            </Grid>

            {/* Información de Pago */}
            <Grid item xs={12} sm={4}>
              <h3>Información de Pago</h3>
              <TextField
                label="Nombre Responsable"
                name="NOMBRE_RESPONSABLE"
                value={formData.INFORMACION_DE_PAGO.NOMBRE_RESPONSABLE}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "NOMBRE_RESPONSABLE",
                    "INFORMACION_DE_PAGO"
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Correo Electrónico"
                name="CORREO_ELECTRONICO"
                value={formData.INFORMACION_DE_PAGO.CORREO_ELECTRONICO}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "CORREO_ELECTRONICO",
                    "INFORMACION_DE_PAGO"
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono Responsable"
                name="TELEFONO_RESPONSABLE"
                value={formData.INFORMACION_DE_PAGO.TELEFONO_RESPONSABLE}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "TELEFONO_RESPONSABLE",
                    "INFORMACION_DE_PAGO"
                  )
                }
                fullWidth
                margin="normal"
              />
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
