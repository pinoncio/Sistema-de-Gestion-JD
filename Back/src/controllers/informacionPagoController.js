const { InformacionDePago } = require("../models/informacionPagoModel");
const { Cliente } = require("../models/clienteModel");

// Obtener todas las informaciones de pago
const getInformacionesDePago = async (req, res) => {
  try {
    const informaciones = await InformacionDePago.findAll({
      attributes: { exclude: [] }, // Permite que todos los atributos puedan ser nulos
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["NOMBRE_RAZON_SOCIAL", "RUT"],
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


// Obtener una informacion de pago por id
const getInformacionDePago = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const informacion = await InformacionDePago.findOne({
      where: { ID_CLIENTE: id_cliente },
      attributes: { exclude: [] }, // Permite atributos con valores nulos
    });

    if (!informacion) {
      return res.status(404).json({
        msg: `La información de pago para el cliente con id ${id_cliente} no existe`,
      });
    }

    res.json(informacion);
  } catch (error) {
    console.error(
      `Error al obtener la información de pago para el cliente con id ${id_cliente}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener la información de pago para el cliente con id ${id_cliente}`,
      error: error.message || error,
    });
  }
};


// Crear una nueva informacion de pago
const newInformacionDePago = async (req, res) => {
  const {
    ID_CLIENTE,
    NOMBRE_RESPONSABLE,
    CORREO_ELECTRONICO,
    TELEFONO_RESPONSABLE,
  } = req.body;

  try {
    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findOne({ where: { ID_CLIENTE } });
    if (!clienteExistente) {
      return res.status(400).json({
        msg: "El cliente con el ID proporcionado no existe",
      });
    }

    // Crear la información de pago
    const informacion = await InformacionDePago.create({
      ID_CLIENTE,
      NOMBRE_RESPONSABLE,
      CORREO_ELECTRONICO,
      TELEFONO_RESPONSABLE,
    });

    console.log("Información de pago creada exitosamente:", informacion);

    return res.status(201).json({
      msg: "Información de pago creada correctamente",
      informacion,
    });
  } catch (error) {
    console.error("Error al crear la información de pago:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear la información de pago",
      error,
    });
  }
};

// Actualizar una informacion de pago
const updateInformacionDePago = async (req, res) => {
  const { id_cliente } = req.params;
  const { NOMBRE_RESPONSABLE, CORREO_ELECTRONICO, TELEFONO_RESPONSABLE } =
    req.body;

  const informacion = await InformacionDePago.findOne({
    where: { ID_CLIENTE: id_cliente },
  });
  if (!informacion) {
    return res.status(404).json({
      msg: "No existe una información de pago con id: " + id_cliente,
    });
  }

  try {
    // Actualizar la información de pago
    await InformacionDePago.update(
      { NOMBRE_RESPONSABLE, CORREO_ELECTRONICO, TELEFONO_RESPONSABLE },
      { where: { ID_CLIENTE: id_cliente } }
    );

    return res.json({
      msg: "Información de pago actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la información de pago:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar la información de pago",
      error: error.message || error,
    });
  }
};

// Eliminar una informacion de pago
const deleteInformacionDePago = async (req, res) => {
  const { id_informacion } = req.params;

  try {
    const result = await InformacionDePago.destroy({
      where: { ID_INFORMACION: id_informacion },
    });

    if (result === 1) {
      console.log(
        `Información de pago con ID ${id_informacion} eliminada correctamente.`
      );
      return res.json({ msg: "Información de pago eliminada correctamente" });
    } else {
      console.log(
        `No se encontró ninguna información de pago con ID ${id_informacion} para eliminar.`
      );
      return res.status(404).json({
        msg: "No se encontró ninguna información de pago para eliminar.",
      });
    }
  } catch (error) {
    console.error(
      `Error al eliminar la información de pago con ID ${id_informacion}:`,
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
