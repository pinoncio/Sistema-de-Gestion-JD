const { clientemetodopago } = require("../models/clientemetodopagomodel");
const { cliente } = require("../models/clientemodel");
const { metodopago } = require("../models/metodopagomodel");

// código en clientemetodopagocontroller.js
const agregarMetodoPagoCliente = async (req, res) => {
  try {
    const { id_cliente, id_metodo_pago, referencia } = req.body;

    // buscar al cliente por su id
    const cliente = await cliente.findOne({ where: { id_cliente } });
    if (!cliente) {
      return res.status(404).json({ msg: "cliente no encontrado" });
    }

    // buscar el método de pago por su id
    const metodopago = await metodopago.findOne({ where: { id_metodo_pago } });
    if (!metodopago) {
      return res.status(404).json({ msg: "método de pago no encontrado" });
    }

    // crear la relación en la tabla intermedia clientemetodopago
    await clientemetodopago.create({
      id_cliente: id_cliente,
      id_metodo_pago: id_metodo_pago,
      referencia: referencia,
    });

    res
      .status(200)
      .json({ msg: "método de pago agregado correctamente al cliente" });
  } catch (error) {
    console.error("error al agregar el método de pago:", error);
    res.status(500).json({ msg: "error al agregar el método de pago", error });
  }
};

// obtener todos los métodos de pago de un cliente por su id
const obtenerMetodosPagoCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const cliente = await cliente.findbypk(id_cliente, {
      include: [
        {
          model: clientemetodopago,
          as: "clientemetodospago", // alias de la relación cliente -> clientemetodopago
          attributes: ["id_metodo_pago", "referencia"], // columnas específicas de clientemetodopago
          include: [
            {
              model: metodopago,
              as: "metodopago", // alias de la relación clientemetodopago -> metodopago
              attributes: ["nombre_metodo", "descripcion"], // columnas específicas de metodopago
            },
          ],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({
        msg: "cliente no encontrado",
      });
    }

    // acceder a los métodos de pago del cliente
    return res.status(200).json(cliente.clientemetodospago);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "error al obtener los métodos de pago del cliente",
      error,
    });
  }
};

// obtener un método de pago específico para un cliente
const obtenerMetodoPagoClienteporId = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const cliente = await cliente.findbypk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "cliente no encontrado",
      });
    }

    const metodopago = await clientemetodopago.findone({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
      include: [
        {
          model: metodopago,
          as: "metodopago", // alias de la relación clientemetodopago -> metodopago
          attributes: ["nombre_metodo", "descripcion"], // columnas específicas de metodopago
        },
      ],
    });

    if (!metodopago) {
      return res.status(404).json({
        msg: "método de pago no encontrado para este cliente",
      });
    }

    return res.status(200).json(metodopago);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "error al obtener el método de pago del cliente",
      error,
    });
  }
};


// actualizar la referencia de un método de pago de un cliente
const actualizarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;
  const { referencia } = req.body;

  try {
    const cliente = await cliente.findbypk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "cliente no encontrado",
      });
    }

    const metodopago = await clientemetodopago.findone({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
    });

    if (!metodopago) {
      return res.status(404).json({
        msg: "método de pago no encontrado para este cliente",
      });
    }

    metodopago.referencia = referencia;
    await metodopago.save();

    return res.status(200).json({
      msg: "método de pago actualizado correctamente",
      metodopago,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "error al actualizar el método de pago del cliente",
      error,
    });
  }
};

// eliminar un método de pago de un cliente
const eliminarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const cliente = await cliente.findbypk(id_cliente);
    if (!cliente) {
      return res.status(404).json({
        msg: "cliente no encontrado",
      });
    }

    const metodopago = await clientemetodopago.findone({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
    });

    if (!metodopago) {
      return res.status(404).json({
        msg: "método de pago no encontrado para este cliente",
      });
    }

    await metodopago.destroy();

    return res.status(200).json({
      msg: "método de pago eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "error al eliminar el método de pago del cliente",
      error,
    });
  }
};

module.exports = {
  agregarMetodoPagoCliente,
  obtenerMetodosPagoCliente,
  obtenerMetodoPagoClienteporId,
  actualizarMetodoPagoCliente,
  eliminarMetodoPagoCliente,
};
