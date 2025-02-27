const { metodoPago } = require("../models/metodopagomodel");

// Obtener todos los métodos de pago
const getAllMetodoPago = async (req, res) => {
  try {
    const metodosPago = await metodoPago.findAll();
    if (metodosPago.length === 0) {
      return res.status(404).json({ message: "No se encontraron métodos de pago." });
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

// Obtener un método de pago por su id
const getMetodoPagoById = async (req, res) => {
  const { id_metodo_pago } = req.params;

  try {
    // Buscar el método de pago por su id
    const metodoPago = await metodoPago.findByPk(id_metodo_pago);
    
    // Si no se encuentra el método de pago
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }

    // Si se encuentra, devolverlo
    res.json(metodoPago);
  } catch (error) {
    console.error("Error al obtener el método de pago por id:", error);
    res.status(500).json({
      message: "Error al obtener el método de pago.",
      error: error.message,
    });
  }
};

// Crear un nuevo método de pago
const createMetodoPago = async (req, res) => {
  const { nombreMetodo, descripcion } = req.body;

  console.log('Datos recibidos en el backend:', { nombreMetodo, descripcion });

  if (!nombreMetodo || !descripcion) {
    return res.status(400).json({
      message: "Faltan datos requeridos: nombreMetodo o descripcion.",
    });
  }

  try {
    // Crear el nuevo método de pago
    const nuevoMetodo = await metodoPago.create({
      nombreMetodo,
      descripcion,
    });

    return res.status(201).json({
      message: "Método de pago creado correctamente.",
      metodoPago: nuevoMetodo, // Devolver el objeto creado
    });
  } catch (error) {
    console.error("Error al crear el método de pago:", error);
    res.status(500).json({
      message: "Error al crear el método de pago.",
      error: error.message,
    });
  }
};

// Actualizar un método de pago
const updateMetodoPago = async (req, res) => {
  const { id_metodo_pago } = req.params;
  const { nombreMetodo, descripcion } = req.body;

  if (!nombreMetodo && !descripcion) {
    return res.status(400).json({
      message: "Se debe proporcionar al menos un campo para actualizar.",
    });
  }

  try {
    const metodoPago = await metodoPago.findByPk(id_metodo_pago);
    if (!metodoPago) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }

    metodoPago.nombreMetodo = nombreMetodo || metodoPago.nombreMetodo;
    metodoPago.descripcion = descripcion || metodoPago.descripcion;

    await metodoPago.save();

    res.json({
      message: "Método de pago actualizado correctamente.",
      metodoPago,
    });
  } catch (error) {
    console.error("Error al actualizar el método de pago:", error);
    res.status(500).json({
      message: "Error al actualizar el método de pago.",
      error: error.message,
    });
  }
};

// Eliminar un método de pago
const deleteMetodoPago = async (req, res) => {
  const { id_metodo_pago } = req.params;

  try {
    const metodoPago = await metodoPago.findByPk(id_metodo_pago);
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
