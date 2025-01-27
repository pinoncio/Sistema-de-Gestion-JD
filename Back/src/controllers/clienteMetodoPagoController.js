const { ClienteMetodoPago } = require("../models/clienteMetodoPagoModel");
const { Cliente } = require("../models/clienteModel");
const { MetodoPago } = require("../models/metodoPagoModel");

// Código en clienteMetodoPagoController.js
const agregarMetodoPagoCliente = async (req, res) => {
  try {
    const { id_cliente, id_metodo_pago, referencia } = req.body;

    // Buscar al cliente por su ID
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    // Buscar el método de pago por su ID
    const metodoPago = await MetodoPago.findByPk(id_metodo_pago);
    if (!metodoPago) {
      return res.status(404).json({ msg: "Método de pago no encontrado" });
    }

    // Crear la relación en la tabla intermedia ClienteMetodoPago
    await ClienteMetodoPago.create({
      ID_CLIENTE: id_cliente,
      ID_METODO_PAGO: id_metodo_pago,
      REFERENCIA: referencia,
    });

    res
      .status(200)
      .json({ msg: "Método de pago agregado correctamente al cliente" });
  } catch (error) {
    console.error("Error al agregar el método de pago:", error);
    res.status(500).json({ msg: "Error al agregar el método de pago", error });
  }
};

// Obtener todos los métodos de pago de un cliente por su ID
const obtenerMetodosPagoCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(id_cliente, {
      include: [
        {
          model: ClienteMetodoPago,
          as: "clienteMetodosPago", // Alias de la relación Cliente -> ClienteMetodoPago
          attributes: ["ID_METODO_PAGO", "REFERENCIA"], // Columnas específicas de ClienteMetodoPago
          include: [
            {
              model: MetodoPago,
              as: "metodoPago", // Alias de la relación ClienteMetodoPago -> MetodoPago
              attributes: ["NOMBRE_METODO", "DESCRIPCION"], // Columnas específicas de MetodoPago
            },
          ],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    // Acceder a los métodos de pago del cliente
    return res.status(200).json(cliente.clienteMetodosPago);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al obtener los métodos de pago del cliente",
      error,
    });
  }
};

// Obtener un método de pago específico para un cliente
const obtenerMetodoPagoClientePorId = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPago = await ClienteMetodoPago.findOne({
      where: {
        ID_CLIENTE: id_cliente,
        ID_METODO_PAGO: id_metodo_pago,
      },
      include: [
        {
          model: MetodoPago,
          as: "metodoPago", // Alias de la relación ClienteMetodoPago -> MetodoPago
          attributes: ["NOMBRE_METODO", "DESCRIPCION"], // Columnas específicas de MetodoPago
        },
      ],
    });

    if (!metodoPago) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    return res.status(200).json(metodoPago);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al obtener el método de pago del cliente",
      error,
    });
  }
};


// Actualizar la referencia de un método de pago de un cliente
const actualizarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;
  const { referencia } = req.body;

  try {
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPago = await ClienteMetodoPago.findOne({
      where: {
        ID_CLIENTE: id_cliente,
        ID_METODO_PAGO: id_metodo_pago,
      },
    });

    if (!metodoPago) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    metodoPago.REFERENCIA = referencia;
    await metodoPago.save();

    return res.status(200).json({
      msg: "Método de pago actualizado correctamente",
      metodoPago,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al actualizar el método de pago del cliente",
      error,
    });
  }
};

// Eliminar un método de pago de un cliente
const eliminarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPago = await ClienteMetodoPago.findOne({
      where: {
        ID_CLIENTE: id_cliente,
        ID_METODO_PAGO: id_metodo_pago,
      },
    });

    if (!metodoPago) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    await metodoPago.destroy();

    return res.status(200).json({
      msg: "Método de pago eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al eliminar el método de pago del cliente",
      error,
    });
  }
};

module.exports = {
  agregarMetodoPagoCliente,
  obtenerMetodosPagoCliente,
  obtenerMetodoPagoClientePorId,
  actualizarMetodoPagoCliente,
  eliminarMetodoPagoCliente,
};
