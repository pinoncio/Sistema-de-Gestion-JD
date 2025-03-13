const { clientemetodopago } = require("../models/clientemetodopagomodel");
const { cliente } = require("../models/clientemodel");
const { metodopago } = require("../models/metodopagomodel");

const agregarMetodoPagoCliente = async (req, res) => {
  try {
    const { id_cliente, id_metodo_pago } = req.body;

    const clienteData = await cliente.findOne({ where: { id_cliente } });
    if (!clienteData) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    const metodoPagoData = await metodopago.findOne({
      where: { id_metodo_pago },
    });
    if (!metodoPagoData) {
      return res.status(404).json({ msg: "Método de pago no encontrado" });
    }

    await clientemetodopago.create({
      id_cliente: id_cliente,
      id_metodo_pago: id_metodo_pago,
    });

    res
      .status(200)
      .json({ msg: "Método de pago agregado correctamente al cliente" });
  } catch (error) {
    console.error("Error al agregar el método de pago:", error);
    res.status(500).json({ msg: "Error al agregar el método de pago", error });
  }
};

const obtenerMetodosPagoCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const clienteData = await cliente.findByPk(id_cliente, {
      include: [
        {
          model: clientemetodopago,
          as: "clientemetodospago",
          attributes: ["id_metodo_pago"],
          include: [
            {
              model: metodopago,
              as: "metodopago",
              attributes: ["nombre_metodo", "descripcion"],
            },
          ],
        },
      ],
    });

    if (!clienteData) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    return res.status(200).json(clienteData.clientemetodospago);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al obtener los métodos de pago del cliente",
      error,
    });
  }
};

const obtenerMetodoPagoClienteporId = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const clienteData = await cliente.findByPk(id_cliente);
    if (!clienteData) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPagoData = await clientemetodopago.findOne({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
      include: [
        {
          model: metodopago,
          as: "metodopago",
          attributes: ["nombre_metodo", "descripcion"],
        },
      ],
    });

    if (!metodoPagoData) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    return res.status(200).json(metodoPagoData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al obtener el método de pago del cliente",
      error,
    });
  }
};

const actualizarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const clienteData = await cliente.findByPk(id_cliente);
    if (!clienteData) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPagoData = await clientemetodopago.findOne({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
    });

    if (!metodoPagoData) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    await metodoPagoData.save();

    return res.status(200).json({
      msg: "Método de pago actualizado correctamente",
      metodoPagoData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al actualizar el método de pago del cliente",
      error,
    });
  }
};

const eliminarMetodoPagoCliente = async (req, res) => {
  const { id_cliente, id_metodo_pago } = req.params;

  try {
    const clienteData = await cliente.findByPk(id_cliente);
    if (!clienteData) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const metodoPagoData = await clientemetodopago.findOne({
      where: {
        id_cliente: id_cliente,
        id_metodo_pago: id_metodo_pago,
      },
    });

    if (!metodoPagoData) {
      return res.status(404).json({
        msg: "Método de pago no encontrado para este cliente",
      });
    }

    await metodoPagoData.destroy();

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
  obtenerMetodoPagoClienteporId,
  actualizarMetodoPagoCliente,
  eliminarMetodoPagoCliente,
};
