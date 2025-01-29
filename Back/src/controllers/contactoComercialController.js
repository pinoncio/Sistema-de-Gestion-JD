const { ContactoComercial } = require("../models/contactoComercialModel");
const { Cliente } = require("../models/clienteModel");

// Obtener todos los contactos comerciales
const getContactosComerciales = async (req, res) => {
  try {
    const contactos = await ContactoComercial.findAll({
      include: [
        {
          model: Cliente,
          as: "cliente", // Alias de la relación ContactoComercial -> Cliente
          attributes: ["NOMBRE_RAZON_SOCIAL", "RUT"], // Columnas específicas de Cliente
        },
      ],
    });

    console.log("Contactos comerciales obtenidos:", contactos);
    res.json(contactos);
  } catch (error) {
    console.error("Error al obtener la lista de contactos comerciales:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de contactos comerciales.",
      error: error.message || error,
    });
  }
};

// Obtener un contacto comercial por id
const getContactoComercial = async (req, res) => {
  const { id_cliente } = req.params; // Usamos id_cliente en lugar de id_contacto_comercial
  try {
    const contacto = await ContactoComercial.findOne({
      where: { ID_CLIENTE: id_cliente }, 
    });

    if (!contacto) {
      return res.status(404).json({
        msg: `No se encontró el contacto comercial para el cliente con id ${id_cliente}`,
      });
    }

    res.json(contacto);
  } catch (error) {
    console.error(
      `Error al obtener el contacto comercial para el cliente con id ${id_cliente}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener el contacto comercial para el cliente con id ${id_cliente}`,
      error: error.message || error,
    });
  }
};

// Crear un nuevo contacto comercial
const newContactoComercial = async (req, res) => {
  const {
    ID_CLIENTE,
    CONTACTO_COMERCIAL,
    CORREO_ELECTRONICO_COMERCIAL,
    TELEFONO_FIJO,
    TELEFONO_CELULAR,
  } = req.body;

  try {
    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findOne({ where: { ID_CLIENTE } });
    if (!clienteExistente) {
      return res.status(400).json({
        msg: "El cliente con el ID proporcionado no existe",
      });
    }

    // Crear el contacto comercial
    const contacto = await ContactoComercial.create({
      ID_CLIENTE,
      CONTACTO_COMERCIAL,
      CORREO_ELECTRONICO_COMERCIAL,
      TELEFONO_FIJO,
      TELEFONO_CELULAR,
    });

    console.log("Contacto comercial creado exitosamente:", contacto);

    return res.status(201).json({
      msg: "Contacto comercial creado correctamente",
      contacto,
    });
  } catch (error) {
    console.error("Error al crear el contacto comercial:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el contacto comercial",
      error,
    });
  }
};

// Actualizar un contacto comercial
const updateContactoComercial = async (req, res) => {
  const { id_contacto_comercial } = req.params;
  const {
    CONTACTO_COMERCIAL,
    CORREO_ELECTRONICO_COMERCIAL,
    TELEFONO_FIJO,
    TELEFONO_CELULAR,
  } = req.body;

  const contacto = await ContactoComercial.findOne({
    where: { ID_CONTACTO_COMERCIAL: id_contacto_comercial },
  });

  if (!contacto) {
    return res.status(404).json({
      msg: "No existe un contacto comercial con id: " + id_contacto_comercial,
    });
  }

  try {
    // Actualizar el contacto comercial
    await ContactoComercial.update(
      {
        CONTACTO_COMERCIAL,
        CORREO_ELECTRONICO_COMERCIAL,
        TELEFONO_FIJO,
        TELEFONO_CELULAR,
      },
      { where: { ID_CONTACTO_COMERCIAL: id_contacto_comercial } }
    );

    return res.json({
      msg: "Contacto comercial actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el contacto comercial:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el contacto comercial",
      error: error.message || error,
    });
  }
};

// Eliminar un contacto comercial
const deleteContactoComercial = async (req, res) => {
  const { id_contacto_comercial } = req.params;

  try {
    const result = await ContactoComercial.destroy({
      where: { ID_CONTACTO_COMERCIAL: id_contacto_comercial },
    });

    if (result === 1) {
      console.log(
        `Contacto comercial con ID ${id_contacto_comercial} eliminado correctamente.`
      );
      return res.json({ msg: "Contacto comercial eliminado correctamente" });
    } else {
      console.log(
        `No se encontró ningún contacto comercial con ID ${id_contacto_comercial} para eliminar.`
      );
      return res
        .status(404)
        .json({
          msg: "No se encontró ningún contacto comercial para eliminar.",
        });
    }
  } catch (error) {
    console.error(
      `Error al eliminar el contacto comercial con ID ${id_contacto_comercial}:`,
      error
    );
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el contacto comercial.",
      error: error.message,
    });
  }
};

module.exports = {
  newContactoComercial,
  updateContactoComercial,
  getContactoComercial,
  getContactosComerciales,
  deleteContactoComercial,
};
