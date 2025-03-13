const { metodopago } = require("../models/metodopagomodel");

const getAllMetodoPago = async (req, res) => {
  try {
    const metodosPago = await metodopago.findAll();
    if (metodosPago.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron métodos de pago." });
    }
    res.json(metodosPago);
  } catch (error) {
    console.error("Error al obtener métodos de pago:", error);
    res.status(500).json({
      message: "Error al obtener métodos de pago.",
      error: error.message,
    });
  }
};

const getMetodoPagoById = async (req, res) => {
  const { id_metodo_pago } = req.params;

  try {
    const metodoPago = await metodopago.findByPk(id_metodo_pago);

    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }

    res.json(metodoPago);
  } catch (error) {
    console.error("Error al obtener el método de pago por id:", error);
    res.status(500).json({
      message: "Error al obtener el método de pago.",
      error: error.message,
    });
  }
};

const createMetodoPago = async (req, res) => {
  const { nombre_metodo, descripcion } = req.body;

  console.log("Datos recibidos en el backend:", { nombre_metodo, descripcion });

  if (!nombre_metodo || !descripcion) {
    return res.status(400).json({
      message: "Faltan datos requeridos: nombre_metodo o descripcion.",
    });
  }

  try {
    const nuevoMetodo = await metodopago.create({
      nombre_metodo,
      descripcion,
    });

    return res.status(201).json({
      message: "Método de pago creado correctamente.",
      metodo_pago: nuevoMetodo,
    });
  } catch (error) {
    console.error("Error al crear el método de pago:", error);
    res.status(500).json({
      message: "Error al crear el método de pago.",
      error: error.message,
    });
  }
};

const updateMetodoPago = async (req, res) => {
  const { id_metodo_pago } = req.params;
  const { nombre_metodo, descripcion } = req.body;

  if (!nombre_metodo && !descripcion) {
    return res.status(400).json({
      message: "Se debe proporcionar al menos un campo para actualizar.",
    });
  }

  try {
    const metodoPago = await metodopago.findByPk(id_metodo_pago);
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }

    metodoPago.nombre_metodo = nombre_metodo || metodoPago.nombre_metodo;
    metodoPago.descripcion = descripcion || metodoPago.descripcion;

    await metodoPago.save();

    res.json({
      message: "Método de pago actualizado correctamente.",
      metodo_pago: metodoPago,
    });
  } catch (error) {
    console.error("Error al actualizar el método de pago:", error);
    res.status(500).json({
      message: "Error al actualizar el método de pago.",
      error: error.message,
    });
  }
};

const deleteMetodoPago = async (req, res) => {
  const { id_metodo_pago } = req.params;

  try {
    const metodoPago = await metodopago.findByPk(id_metodo_pago);
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }

    await metodoPago.destroy();
    res.json({ message: "Método de pago eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el método de pago:", error);
    res.status(500).json({
      message: "Error al eliminar el método de pago.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMetodoPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
  getMetodoPagoById,
};
