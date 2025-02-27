const { contactocomercial } = require("../models/contactocomercialmodel");
const { cliente } = require("../models/clientemodel");

// Obtener todos los contactos comerciales
const getContactosComerciales = async (req, res) => {
  try {
    const contactos = await contactocomercial.findAll({
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social", "rut"],
        },
      ],
    });

    if (!contactos || contactos.length === 0) {
      return res
        .status(404)
        .json({ msg: "No hay contactos comerciales registrados." });
    }

    res.json(contactos);
  } catch (error) {
    console.error("Error al obtener la lista de contactos comerciales:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de contactos comerciales.",
      error: error.message || error,
    });
  }
};

// Obtener un contacto comercial por id de cliente
const getContactoComercial = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const contacto = await contactocomercial.findOne({
      where: { id_cliente: id_cliente },
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social", "rut"],
        },
      ],
    });

    if (!contacto) {
      return res.status(404).json({
        msg: `No se encontró un contacto comercial para el cliente con id ${id_cliente}.`,
      });
    }

    res.json(contacto);
  } catch (error) {
    console.error(
      `Error al obtener el contacto comercial para el cliente con id ${id_cliente}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener el contacto comercial para el cliente con id ${id_cliente}.`,
      error: error.message || error,
    });
  }
};

// Crear un nuevo contacto comercial
// Crear un nuevo contacto comercial
const newContactoComercial = async (req, res) => {
  const {
    id_cliente,
    contacto_comercial,
    correo_electronico_comercial,
    telefono_fijo,
    telefono_celular,
  } = req.body;

  try {
    // Verificar si el cliente existe
    const clienteExistente = await cliente.findOne({ where: { id_cliente } });
    if (!clienteExistente) {
      return res.status(400).json({
        msg: "El cliente con el id proporcionado no existe.",
      });
    }

    // Crear el contacto comercial
    const contacto = await contactocomercial.create({
      id_cliente,
      contacto_comercial,
      correo_electronico_comercial,
      telefono_fijo,
      telefono_celular,
    });

    console.log("Contacto comercial creado exitosamente:", contacto);

    return res.status(201).json({
      msg: "Contacto comercial creado correctamente.",
      contacto,
    });
  } catch (error) {
    console.error("Error al crear el contacto comercial:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el contacto comercial.",
      error,
    });
  }
};

// Actualizar un contacto comercial
const updateContactoComercial = async (req, res) => {
  const { id_cliente } = req.params;
  const {
    contacto_comercial,
    correo_electronico_comercial,
    telefono_fijo,
    telefono_celular,
  } = req.body;

  const contacto = await contactocomercial.findOne({
    where: { id_cliente: id_cliente },
  });

  if (!contacto) {
    return res.status(404).json({
      msg: "No existe un contacto comercial con id: " + id_cliente,
    });
  }

  try {
    // Actualizar el contacto comercial
    await contactocomercial.update(
      {
        contacto_comercial,
        correo_electronico_comercial,
        telefono_fijo,
        telefono_celular,
      },
      { where: { id_cliente: id_cliente } }
    );

    return res.json({
      msg: "Contacto comercial actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el contacto comercial:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el contacto comercial.",
      error: error.message || error,
    });
  }
};

// Eliminar un contacto comercial
const deleteContactoComercial = async (req, res) => {
  const { id_contacto } = req.params;

  try {
    const result = await contactocomercial.destroy({
      where: { id_contacto: id_contacto },
    });

    if (result === 1) {
      console.log(
        `Contacto comercial con id ${id_contacto} eliminado correctamente.`
      );
      return res
        .status(200)
        .json({ msg: "Contacto comercial eliminado correctamente." });
    } else {
      console.log(
        `No se encontró ningún contacto comercial con id ${id_contacto} para eliminar.`
      );
      return res.status(404).json({
        msg: "No se encontró ningún contacto comercial para eliminar.",
      });
    }
  } catch (error) {
    console.error(
      `Error al eliminar el contacto comercial con id ${id_contacto}:`,
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
