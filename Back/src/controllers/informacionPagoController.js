const { informaciondepago } = require("../models/informacionpagomodel");
const { cliente } = require("../models/clientemodel");

const getInformacionesDePago = async (req, res) => {
  try {
    const informaciones = await informaciondepago.findAll({
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social", "rut"],
        },
      ],
    });

    console.log("Informaciones de pago obtenidas:", informaciones);
    res.json(informaciones);
  } catch (error) {
    console.error("Error al obtener la lista de informaciones de pago:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de informaciones de pago.",
      error: error.message || error,
    });
  }
};

const getInformacionDePago = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const informacion = await informaciondepago.findOne({
      where: { id_cliente: id_cliente },
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social", "rut"],
        },
      ],
    });

    if (!informacion) {
      return res.status(404).json({
        msg: `La información de pago para el cliente con id ${id_cliente} no existe.`,
      });
    }

    res.json(informacion);
  } catch (error) {
    console.error(
      `Error al obtener la información de pago para el cliente con id ${id_cliente}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener la información de pago para el cliente con id ${id_cliente}.`,
      error: error.message || error,
    });
  }
};

const newInformacionDePago = async (req, res) => {
  const {
    id_cliente,
    nombre_responsable,
    correo_electronico,
    telefono_responsable,
  } = req.body;

  try {
    const clienteExistente = await cliente.findOne({ where: { id_cliente } });
    if (!clienteExistente) {
      return res.status(400).json({
        msg: "El cliente con el id proporcionado no existe.",
      });
    }

    const informacion = await informaciondepago.create({
      id_cliente,
      nombre_responsable,
      correo_electronico,
      telefono_responsable,
    });

    console.log("Información de pago creada exitosamente:", informacion);

    return res.status(201).json({
      msg: "Información de pago creada correctamente.",
      informacion,
    });
  } catch (error) {
    console.error("Error al crear la información de pago:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear la información de pago.",
      error,
    });
  }
};

const updateInformacionDePago = async (req, res) => {
  const { id_cliente } = req.params;
  const { nombre_responsable, correo_electronico, telefono_responsable } =
    req.body;

  const informacion = await informaciondepago.findOne({
    where: { id_cliente: id_cliente },
  });
  if (!informacion) {
    return res.status(404).json({
      msg: "No existe una información de pago con id: " + id_cliente,
    });
  }

  try {
    await informaciondepago.update(
      { nombre_responsable, correo_electronico, telefono_responsable },
      { where: { id_cliente: id_cliente } }
    );

    return res.json({
      msg: "Información de pago actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar la información de pago:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar la información de pago.",
      error: error.message || error,
    });
  }
};

const deleteInformacionDePago = async (req, res) => {
  const { id_informacion } = req.params;

  try {
    const result = await informaciondepago.destroy({
      where: { id_informacion: id_informacion },
    });

    if (result === 1) {
      console.log(
        `Información de pago con id ${id_informacion} eliminada correctamente.`
      );
      return res.json({ msg: "Información de pago eliminada correctamente." });
    } else {
      console.log(
        `No se encontró ninguna información de pago con id ${id_informacion} para eliminar.`
      );
      return res.status(404).json({
        msg: "No se encontró ninguna información de pago para eliminar.",
      });
    }
  } catch (error) {
    console.error(
      `Error al eliminar la información de pago con id ${id_informacion}:`,
      error
    );
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar la información de pago.",
      error: error.message,
    });
  }
};

module.exports = {
  newInformacionDePago,
  updateInformacionDePago,
  getInformacionDePago,
  getInformacionesDePago,
  deleteInformacionDePago,
};
