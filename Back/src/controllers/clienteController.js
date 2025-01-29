const { Cliente } = require("../models/clienteModel");
const { MetodoPago } = require("../models/metodoPagoModel");
const { ClienteMetodoPago } = require("../models/clienteMetodoPagoModel");
const { ContactoComercial } = require("../models/contactoComercialModel");
const { InformacionDePago } = require("../models/informacionPagoModel");
const  sequelize  = require('../config/db');

// Obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
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

    console.log("Clientes obtenidos:", clientes);
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de clientes.",
      error: error.message || error,
    });
  }
};

// Obtener un cliente por id
const getCliente = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const cliente = await Cliente.findOne({
      where: { ID_CLIENTE: id_cliente },
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
        msg: `El cliente con id ${id_cliente} no existe`,
      });
    }

    res.json(cliente);
  } catch (error) {
    console.error(`Error al obtener el cliente con id ${id_cliente}:`, error);
    res.status(500).json({
      msg: `Error al obtener el cliente con id ${id_cliente}`,
      error: error.message || error,
    });
  }
};

const newCliente = async (req, res) => {
  const {
    codigo_cliente,
    nombre_razon_social,
    nombre_fantasia,
    rut,
    giro,
    direccion,
    ciudad,
    comuna,
    contacto_comercial, // Datos de contacto comercial
    informacion_de_pago, // Datos de información de pago
  } = req.body;

  const transaction = await sequelize.transaction(); // Use sequelize to start the transaction

  try {
    // Verificar existencia del RUT
    const existingCliente = await Cliente.findOne({
      where: { RUT: rut },
    });
    if (existingCliente) {
      return res.status(400).json({
        msg: "El RUT ingresado ya está en uso",
      });
    }

    // Crear el cliente
    const cliente = await Cliente.create(
      {
        CODIGO_CLIENTE: codigo_cliente,
        NOMBRE_RAZON_SOCIAL: nombre_razon_social,
        NOMBRE_FANTASIA: nombre_fantasia,
        RUT: rut,
        GIRO: giro,
        DIRECCION: direccion,
        CIUDAD: ciudad,
        COMUNA: comuna,
      },
      { transaction } // Asociar la transacción al cliente
    );

    // Crear el contacto comercial si se proporciona
    if (contacto_comercial) {
      await ContactoComercial.create(
        {
          ID_CLIENTE: cliente.ID_CLIENTE,
          CONTACTO_COMERCIAL: contacto_comercial.contacto_comercial,
          CORREO_ELECTRONICO_COMERCIAL: contacto_comercial.correo_electronico,
          TELEFONO_FIJO: contacto_comercial.telefono_fijo,
          TELEFONO_CELULAR: contacto_comercial.telefono_celular,
        },
        { transaction } // Asociar la transacción al contacto comercial
      );
    }

    // Crear la información de pago si se proporciona
    if (informacion_de_pago) {
      await InformacionDePago.create(
        {
          ID_CLIENTE: cliente.ID_CLIENTE,
          NOMBRE_RESPONSABLE: informacion_de_pago.nombre_responsable,
          CORREO_ELECTRONICO: informacion_de_pago.correo_electronico,
          TELEFONO_RESPONSABLE: informacion_de_pago.telefono_responsable,
        },
        { transaction } // Asociar la transacción a la información de pago
      );
    }

    // Confirmar la transacción
    await transaction.commit();

    console.log("Cliente y datos relacionados creados exitosamente:", cliente);

    return res.status(201).json({
      msg: "Cliente creado correctamente",
      cliente,
    });
  } catch (error) {
    // Si ocurre un error, revertir la transacción
    await transaction.rollback();
    console.error("Error al crear el cliente:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el cliente",
      error,
    });
  }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
  const { id_cliente } = req.params;
  const {
    codigo_cliente,
    nombre_razon_social,
    nombre_fantasia,
    giro,
    direccion,
    ciudad,
    comuna,
  } = req.body;

  const cliente = await Cliente.findOne({ where: { ID_CLIENTE: id_cliente } });
  if (!cliente) {
    return res.status(404).json({
      msg: "No existe un cliente con id: " + id_cliente,
    });
  }

  try {
    // Actualizar el cliente sin modificar el RUT
    await Cliente.update(
      {
        CODIGO_CLIENTE: codigo_cliente,
        NOMBRE_RAZON_SOCIAL: nombre_razon_social,
        NOMBRE_FANTASIA: nombre_fantasia,
        GIRO: giro,
        DIRECCION: direccion,
        CIUDAD: ciudad,
        COMUNA: comuna,
      },
      { where: { ID_CLIENTE: id_cliente } }
    );

    return res.json({
      msg: "Cliente actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el cliente",
      error: error.message || error,
    });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await Cliente.destroy({ where: { ID_CLIENTE: id_cliente } });

    if (result === 1) {
      console.log(`Cliente con ID ${id_cliente} eliminado correctamente.`);
      return res.json({ msg: "Cliente eliminado correctamente" });
    } else {
      console.log(
        `No se encontró ningún cliente con ID ${id_cliente} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún cliente para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el cliente con ID ${id_cliente}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el cliente.",
      error: error.message,
    });
  }
};

// Activar o desactivar un cliente
const activarCliente = async (req, res) => {
  const { id_cliente } = req.params;
  const { trigger } = req.body;

  const cliente = await Cliente.findOne({
    where: { ID_CLIENTE: id_cliente },
  });
  if (!cliente) {
    return res.status(404).json({
      msg: "El cliente ingresado no existe",
    });
  }

  try {
    if (trigger == 1) {
      await Cliente.update(
        {
          CLIENTE_VIGENTE: true, // Activar cliente
        },
        { where: { ID_CLIENTE: id_cliente } }
      );
      return res.json({
        msg:
          "Se ha activado el cliente con ID " + id_cliente + " correctamente",
      });
    } else {
      await Cliente.update(
        {
          CLIENTE_VIGENTE: false, // Desactivar cliente
        },
        { where: { ID_CLIENTE: id_cliente } }
      );
      return res.json({
        msg:
          "Se ha desactivado el cliente con ID " +
          id_cliente +
          " correctamente",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg:
        "Ha ocurrido un error al activar/desactivar el cliente : " + id_cliente,
      error,
    });
  }
};

module.exports = {
  newCliente,
  updateCliente,
  getCliente,
  getClientes,
  deleteCliente,
  activarCliente,
};
