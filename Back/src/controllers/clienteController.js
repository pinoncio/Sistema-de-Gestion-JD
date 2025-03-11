const { cliente } = require("../models/clientemodel");
const { metodopago } = require("../models/metodopagomodel");
const { clientemetodopago } = require("../models/clientemetodopagomodel");
const { contactocomercial } = require("../models/contactocomercialmodel");
const { informaciondepago } = require("../models/informacionpagomodel");
const sequelize = require("../config/db");

// obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await cliente.findAll({
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
        {
          model: informaciondepago,
          as: "informacionesdepago",
          attributes: ["correo_electronico", "telefono_responsable"],
        },
      ],
    });

    res.json(clientes);
    console.log(clientes);
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de clientes.",
      error: error.message || error,
    });
  }
};



// obtener un cliente por id
const getCliente = async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const clienteData = await cliente.findOne({
      where: { id_cliente },
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
        {
          model: informaciondepago,
          as: "informacionesdepago",
          attributes: ["correo_electronico", "telefono_responsable"],
        },
      ],
    });

    if (!clienteData) {
      return res.status(404).json({
        msg: `El cliente con id ${id_cliente} no existe.`,
      });
    }

    res.json(clienteData);
  } catch (error) {
    console.error(`Error al obtener el cliente con id ${id_cliente}:`, error);
    res.status(500).json({
      msg: `Error al obtener el cliente con id ${id_cliente}`,
      error: error.message || error,
    });
  }
};


// crear un nuevo cliente
const newCliente = async (req, res) => {
  console.log("Datos recibidos:", req.body);

  const {
    codigo_cliente,
    nombre_razon_social,
    nombre_fantasia,
    rut,
    giro,
    direccion,
    ciudad,
    comuna,
    contacto_comercial,
    informacion_de_pago,
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const existingcliente = await cliente.findOne({
      where: { rut },
    });

    if (existingcliente) {
      return res.status(400).json({
        msg: "El rut ingresado ya está en uso.",
      });
    }

    const clienteData = await cliente.create(
      {
        codigo_cliente,
        nombre_razon_social,
        nombre_fantasia,
        rut,
        giro,
        direccion,
        ciudad,
        comuna,
      },
      { transaction }
    );

    // Crear contacto comercial si se proporciona
    if (contacto_comercial) {
      await contactocomercial.create(
        {
          id_cliente: clienteData.id_cliente,
          contacto_comercial: contacto_comercial.contacto_comercial,
          correo_electronico_comercial: contacto_comercial.correo_electronico_comercial,
          telefono_fijo: contacto_comercial.telefono_fijo,
          telefono_celular: contacto_comercial.telefono_celular,
        },
        { transaction }
      );
    }

    // Crear información de pago si se proporciona
    if (informacion_de_pago) {
      await informaciondepago.create(
        {
          id_cliente: clienteData.id_cliente,
          nombre_responsable: informacion_de_pago.nombre_responsable,
          correo_electronico: informacion_de_pago.correo_electronico,
          telefono_responsable: informacion_de_pago.telefono_responsable,
        },
        { transaction }
      );
    }

    await transaction.commit();

    res.status(201).json({
      msg: "Cliente creado correctamente.",
      cliente: clienteData,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear el cliente:", error);
    res.status(400).json({
      msg: "Ocurrió un error al crear el cliente.",
      error: error.message || error,
    });
  }
};

// actualizar un cliente
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
    contacto_comercial,
    informacion_de_pago,
  } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const clienteData = await cliente.findOne({
      where: { id_cliente },
    });

    if (!clienteData) {
      return res.status(404).json({
        msg: `No existe un cliente con id: ${id_cliente}`,
      });
    }

    await clienteData.update(
      {
        codigo_cliente,
        nombre_razon_social,
        nombre_fantasia,
        giro,
        direccion,
        ciudad,
        comuna,
      },
      { transaction }
    );

    if (contacto_comercial) {
      await contactocomercial.upsert(
        {
          id_cliente,
          contacto_comercial: contacto_comercial.contacto_comercial,
          correo_electronico_comercial: contacto_comercial.correo_electronico_comercial,
          telefono_fijo: contacto_comercial.telefono_fijo,
          telefono_celular: contacto_comercial.telefono_celular,
        },
        { transaction }
      );
    }

    if (informacion_de_pago) {
      await informaciondepago.upsert(
        {
          id_cliente,
          nombre_responsable: informacion_de_pago.nombre_responsable,
          correo_electronico: informacion_de_pago.correo_electronico,
          telefono_responsable: informacion_de_pago.telefono_responsable,
        },
        { transaction }
      );
    }

    await transaction.commit();

    res.json({
      msg: "Cliente actualizado correctamente.",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar el cliente:", error);
    res.status(400).json({
      msg: "Error al actualizar el cliente.",
      error: error.message || error,
    });
  }
};

// eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await cliente.destroy({ where: { id_cliente } });

    if (result === 1) {
      return res.json({
        msg: "Cliente eliminado correctamente.",
      });
    } else {
      return res.status(404).json({
        msg: "No se encontró ningún cliente para eliminar.",
      });
    }
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    return res.status(500).json({
      msg: "Error al eliminar el cliente.",
      error: error.message || error,
    });
  }
};

// activar o desactivar un cliente
const activarCliente = async (req, res) => {
  const { id_cliente } = req.params;
  const { trigger } = req.body;

  const clienteData = await cliente.findOne({
    where: { id_cliente },
  });

  if (!clienteData) {
    return res.status(404).json({
      msg: "El cliente no existe.",
    });
  }

  try {
    await clienteData.update(
      {
        cliente_vigente: trigger === 1, // activar o desactivar cliente
      },
      { where: { id_cliente } }
    );

    return res.json({
      msg: `Cliente con id ${id_cliente} ${trigger === 1 ? "activado" : "desactivado"} correctamente.`,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error al activar/desactivar el cliente.",
      error: error.message || error,
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
