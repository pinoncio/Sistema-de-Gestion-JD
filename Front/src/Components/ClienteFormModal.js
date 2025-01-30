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
            clienteData.CODIGO_CLIENTE
          );
          const infoPago = await getInformacionDePago(
            clienteData.CODIGO_CLIENTE
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
          <Grid container spacing={4}>
            {/* Datos del Cliente */}
            <Grid item xs={12} sm={4}>
              <h3>Datos del Cliente</h3>
              <TextField
                label="Código Cliente"
                name="CODIGO_CLIENTE"
                value={formData.CODIGO_CLIENTE}
                onChange={(e) => handleInputChange(e, "CODIGO_CLIENTE")}
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
                onChange={(e) => handleInputChange(e, "NOMBRE_RAZON_SOCIAL")}
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
                onChange={(e) => handleInputChange(e, "NOMBRE_FANTASIA")}
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
                onChange={(e) => handleInputChange(e, "RUT")}
                fullWidth
                margin="normal"
                required
                helperText={errors.RUT || "Por favor ingrese su RUT"}
                error={!!errors.RUT}
              />
              <TextField
                label="Giro"
                name="GIRO"
                value={formData.GIRO}
                onChange={(e) => handleInputChange(e, "GIRO")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Dirección"
                name="DIRECCION"
                value={formData.DIRECCION}
                onChange={(e) => handleInputChange(e, "DIRECCION")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Ciudad"
                name="CIUDAD"
                value={formData.CIUDAD}
                onChange={(e) => handleInputChange(e, "CIUDAD")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Comuna"
                name="COMUNA"
                value={formData.COMUNA}
                onChange={(e) => handleInputChange(e, "COMUNA")}
                fullWidth
                margin="normal"
                required
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
                required
              />
              <TextField
                label="Correo Electrónico"
                name="CORREO_ELECTRONICO"
                value={formData.CONTACTO_COMERCIAL.CORREO_ELECTRONICO}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "CORREO_ELECTRONICO",
                    "CONTACTO_COMERCIAL"
                  )
                }
                fullWidth
                margin="normal"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
