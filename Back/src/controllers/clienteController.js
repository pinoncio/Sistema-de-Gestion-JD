const { cliente } = require("../models/clientemodel");
const { metodopago } = require("../models/metodopagomodel");
const { clientemetodopago } = require("../models/clientemetodopagomodel");
const { contactocomercial } = require("../models/contactocomercialmodel");
const { informaciondepago } = require("../models/informacionpagomodel");
const sequelize = require("../config/db");
const { maquina } = require("../models/maquinamodel");

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
          as: "informacion_de_pago",
          attributes: ["correo_electronico", "telefono_responsable"],
        },
        {
          model: maquina,
          as: "maquinas",
          attributes: [
            "id_maquina",
            "nombre_maquina",
            "modelo_maquina",
            "numero_serie",
            "numero_motor",
          ],
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
          as: "informacion_de_pago",
          attributes: ["correo_electronico", "telefono_responsable"],
        },
        {
          model: maquina, // Agregar la relación con 'maquina'
          as: "maquinas", // Alias de la relación
          attributes: [
            "id_maquina",
            "nombre_maquina",
            "modelo_maquina",
            "numero_serie",
            "numero_motor",
          ], // Asegúrate de seleccionar los atributos necesarios
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

    if (contacto_comercial) {
      await contactocomercial.create(
        {
          id_cliente: clienteData.id_cliente,
          contacto_comercial: contacto_comercial.contacto_comercial,
          correo_electronico_comercial:
            contacto_comercial.correo_electronico_comercial,
          telefono_fijo: contacto_comercial.telefono_fijo,
          telefono_celular: contacto_comercial.telefono_celular,
        },
        { transaction }
      );
    }

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

const updateCliente = async (req, res) => {
  const { id_cliente } = req.params;
  const {
    codigo_cliente,
    rut,
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
    // Buscar el cliente
    const clienteData = await cliente.findOne({
      where: { id_cliente },
      transaction,
    });

    if (!clienteData) {
      return res.status(404).json({
        msg: `No existe un cliente con id: ${id_cliente}`,
      });
    }

    // Verificar si el rut ya está registrado en otro cliente
    if (rut) {
      const existingRut = await cliente.findOne({
        where: { rut },
        transaction,
      });

      if (existingRut && existingRut.id_cliente !== id_cliente) {
        return res.status(400).json({
          msg: `El RUT ${rut} ya está registrado en otro cliente.`,
        });
      }
    }

    // Actualización de datos generales del cliente, incluyendo el rut
    await clienteData.update(
      {
        codigo_cliente,
        rut, 
        nombre_razon_social,
        nombre_fantasia,
        giro,
        direccion,
        ciudad,
        comuna,
      },
      { transaction }
    );

    // Actualización del contacto comercial
    if (contacto_comercial) {
      const {
        id_contacto_comercial,
        contacto_comercial: nombre_contacto,
        correo_electronico_comercial,
        telefono_fijo,
        telefono_celular
      } = contacto_comercial;

      if (id_contacto_comercial) {
        // Intentamos encontrar y editar
        const contactoExistente = await contactocomercial.findOne({
          where: {
            id_contacto_comercial: id_contacto_comercial,
            id_cliente: id_cliente, // importante: debe pertenecer al cliente
          },
          transaction,
        });

        if (!contactoExistente) {
          // Si no lo encuentra, algo está mal
          await transaction.rollback();
          return res.status(404).json({
            msg: `No se encontró contacto comercial con id ${id_contacto_comercial} para el cliente ${id_cliente}`,
          });
        }

        // Si lo encontró, lo actualiza
        await contactoExistente.update(
          {
            contacto_comercial: nombre_contacto || null,
            correo_electronico_comercial: correo_electronico_comercial || null,
            telefono_fijo: telefono_fijo || null,
            telefono_celular: telefono_celular || null,
          },
          { transaction }
        );
      } else {
        // Si no se mandó un ID, entendemos que quiere crear uno nuevo
        await contactocomercial.create(
          {
            id_cliente,
            contacto_comercial: nombre_contacto || null,
            correo_electronico_comercial: correo_electronico_comercial || null,
            telefono_fijo: telefono_fijo || null,
            telefono_celular: telefono_celular || null,
          },
          { transaction }
        );
      }
    }

    // Actualización de la información de pago
    if (informacion_de_pago) {
      if (informacion_de_pago.id_informacion) {
        // Editar información de pago existente
        const infoPagoExistente = await informaciondepago.findByPk(
          informacion_de_pago.id_informacion,
          { transaction }
        );

        if (infoPagoExistente) {
          await infoPagoExistente.update(
            {
              nombre_responsable: informacion_de_pago.nombre_responsable || "",
              correo_electronico: informacion_de_pago.correo_electronico || "",
              telefono_responsable: informacion_de_pago.telefono_responsable || "",
            },
            { transaction }
          );
        }
      } else {
        // Crear nueva info de pago si no tiene ID
        await informaciondepago.create(
          {
            id_cliente,
            nombre_responsable: informacion_de_pago.nombre_responsable || "",
            correo_electronico: informacion_de_pago.correo_electronico || "",
            telefono_responsable: informacion_de_pago.telefono_responsable || "",
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    res.json({
      msg: "Cliente actualizado correctamente.",
    });
  } catch (error) {
    await transaction.rollback();

    // Aquí mostramos más detalles del error
    console.error("Error al actualizar el cliente:", error);

    // Si el error tiene errores de validación, los mostramos
    if (error.errors && error.errors.length > 0) {
      error.errors.forEach((validationError) => {
        console.log(`Error de validación: Campo: ${validationError.path}, Mensaje: ${validationError.message}`);
      });
    }

    res.status(400).json({
      msg: "Error al actualizar el cliente.",
      error: error.message || error,
      stack: error.stack || "No stack available", 
    });
  }
};

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
        cliente_vigente: trigger === 1,
      },
      { where: { id_cliente } }
    );

    return res.json({
      msg: `Cliente con id ${id_cliente} ${
        trigger === 1 ? "activado" : "desactivado"
      } correctamente.`,
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
