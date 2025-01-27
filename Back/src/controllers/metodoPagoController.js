const { MetodoPago } = require("../models/metodoPagoModel");

// Obtener todos los métodos de pago
const getAllMetodoPago = async (req, res) => {
  try {
    const metodosPago = await MetodoPago.findAll();
    if (metodosPago.length === 0) {
      return res.status(404).json({ message: "No se encontraron métodos de pago." });
    }
    res.json(metodosPago);
  } catch (error) {
    console.error("Error al obtener métodos de pago:", error);
    res.status(500).json({
      message: "Error al obtener métodos de pago",
      error: error.message,
    });
  }
};

// Crear un nuevo método de pago
const createMetodoPago = async (req, res) => {
  const { nombre_metodo, descripcion } = req.body;

  console.log('Datos recibidos en el backend:', { nombre_metodo, descripcion });

  if (!nombre_metodo || !descripcion) {
    return res.status(400).json({
      message: "Faltan datos requeridos: nombre_metodo o descripcion",
    });
  }

  try {
    // Crear el nuevo método de pago
    const nuevoMetodo = await MetodoPago.create({
      NOMBRE_METODO: nombre_metodo,
      DESCRIPCION: descripcion,
    });

    return res.status(201).json({
      message: "Método de pago creado correctamente",
      metodo_pago: nuevoMetodo, // Devuelvo el objeto creado
    });
  } catch (error) {
    console.error("Error al crear el método de pago:", error);
    res.status(500).json({
      message: "Error al crear el método de pago",
      error: error.message,
    });
  }
};

// Actualizar un método de pago
const updateMetodoPago = async (req, res) => {
  const { ID_METODO_PAGO } = req.params;
  const { NOMBRE_METODO, DESCRIPCION } = req.body;

  if (!NOMBRE_METODO && !DESCRIPCION) {
    return res.status(400).json({
      message: "Se debe proporcionar al menos un campo para actualizar.",
    });
  }

  try {
    const metodoPago = await MetodoPago.findByPk(ID_METODO_PAGO);
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado" });
    }

    metodoPago.NOMBRE_METODO = NOMBRE_METODO || metodoPago.NOMBRE_METODO;
    metodoPago.DESCRIPCION = DESCRIPCION || metodoPago.DESCRIPCION;

    await metodoPago.save();

    res.json({
      message: "Método de pago actualizado correctamente",
      metodo_pago: metodoPago,
    });
  } catch (error) {
    console.error("Error al actualizar el método de pago:", error);
    res.status(500).json({
      message: "Error al actualizar el método de pago",
      error: error.message,
    });
  }
};

// Eliminar un método de pago
const deleteMetodoPago = async (req, res) => {
  const { ID_METODO_PAGO } = req.params;

  try {
    const metodoPago = await MetodoPago.findByPk(ID_METODO_PAGO);
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado" });
    }

    await metodoPago.destroy();
    res.json({ message: "Método de pago eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el método de pago:", error);
    res.status(500).json({
      message: "Error al eliminar el método de pago",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMetodoPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
};
