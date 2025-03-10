const { ot } = require("../models/otmodel");
const { cliente } = require("../models/clientemodel");
const { otinsumo } = require("../models/otinsumomodel");
const { insumo } = require("../models/insumomodel");
const { producto } = require("../models/productomodel");
const { clientemetodopago } = require("../models/clientemetodopagomodel");
const { metodopago } = require("../models/metodopagomodel");
const { contactocomercial } = require("../models/contactocomercialmodel");
const { informaciondepago } = require("../models/informacionpagomodel");

// Obtener todas las órdenes de trabajo
const getOts = async (req, res) => {
  try {
    const ots = await ot.findAll({
      include: [
        { model: cliente, attributes: ["nombre_razon_social", "rut"] },

        {
          model: otinsumo,
          as: "ot_insumo",
          attributes: [
            "id_insumo",
            "cantidad_insumo",
            "precio_unitario",
            "descuento_insumo",
            "recargo_insumo",
            "af_ex_insumo",
            "precio_total",
          ],
          include: [
            {
              model: insumo,
              as: "insumo",
              attributes: ["nombre_insumo"],
            },
          ],
        },
        {
          model: producto, 
          as: "productos",
          attributes: [
            "nombre_producto",
            "cantidad_producto",
            "precio_unitario",
            "descuento_producto",
            "recargo_producto",
            "af_ex",
            "precio_total",
          ],
        },
      ],
    });

    res.json(ots);
  } catch (error) {
    console.error("Error al obtener las órdenes de trabajo:", error);
    res.status(500).json({
      msg: "Error al obtener las órdenes de trabajo.",
      error: error.message || error,
    });
  }
};


const getOt = async (req, res) => {
  const { id_ot } = req.params;
  try {
    const otData = await ot.findOne({
      where: { id_ot },
      include: [
        {
          model: cliente,
          attributes: ["nombre_razon_social", "rut", "direccion", "giro"],
        },
        {
          model: otinsumo,
          as: "ot_insumo",
          attributes: [
            "id_insumo",
            "cantidad_insumo",
            "precio_unitario",
            "descuento_insumo",
            "recargo_insumo",
            "af_ex_insumo",
            "precio_total",
          ],
          include: [
            {
              model: insumo,
              as: "insumo",
              attributes: ["nombre_insumo"],
            },
          ],
        },
        {
          model: producto,
          as: "productos", 
          attributes: [
            "nombre_producto",
            "cantidad_producto",
            "precio_unitario",
            "descuento_producto",
            "recargo_producto",
            "af_ex",
            "precio_total",
          ],
        },
      ],
    });

    if (!otData) {
      return res.status(404).json({
        msg: `La orden de trabajo con id: ${id_ot} no existe`,
      });
    }

    res.json(otData);
  } catch (error) {
    console.error(
      `Error al obtener la orden de trabajo con id ${id_ot}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener la orden de trabajo con id ${id_ot}`,
      error: error.message || error,
    });
  }
};

const getPdfOt = async (req, res) => {
  try {
    const otData = await ot.findOne({
      where: { id_ot: req.params.id_ot },
      include: [
        {
          model: cliente,
          attributes: [
            "nombre_razon_social",
            "rut",
            "direccion",
            "comuna",
            "giro",
            "ciudad",
          ],
          include: [
            {
              model: clientemetodopago,
              as: "clientemetodospago", // Correcto
              attributes: ["id_metodo_pago"],
              include: [
                {
                  model: metodopago,
                  as: "metodopago",
                  attributes: ["nombre_metodo"],
                },
              ],
            },
            {
              model: contactocomercial,
              as: "contacto_comercial",
              attributes: ["telefono_fijo", "telefono_celular"],
            },
            {
              model: informaciondepago,
              as: "informacionesdepago",
              attributes: ["telefono_responsable"],
            },
          ],
        },
        {
          model: otinsumo,
          as: "ot_insumo",
          attributes: [
            "id_insumo",
            "cantidad_insumo",
            "precio_unitario",
            "descuento_insumo",
            "recargo_insumo",
            "af_ex_insumo",
            "precio_total",
          ],
          include: [
            {
              model: insumo,
              as: "insumo",
              attributes: ["nombre_insumo"],
            },
          ],
        },
        {
          model: producto,
          as: "productos",
          attributes: [
            "id_producto",
            "nombre_producto",
            "cantidad_producto",
            "precio_unitario",
            "recargo_producto",
            "descuento_producto",
            "af_ex",
            "precio_total",
          ],
        },
      ],
    });

    // Si no se encuentra la OT, retornar un error 404
    if (!otData) {
      return res.status(404).json({
        msg: "Orden de trabajo no encontrada.",
      });
    }

    // Devolver los datos obtenidos en formato JSON
    res.json(otData);
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    res.status(500).json({
      msg: "Error al obtener la orden de trabajo.",
      error: error.message || error,
    });
  }
};


const newOt = async (req, res) => {
  const {
    id_cliente,
    tipo_documento,
    fecha_solicitud,
    fecha_entrega,
    tipo_ot,
    equipo,
    numero_serie,
    horas_trabajo,
    prioridad,
    observacion_inicial,
    observacion_final,
    descripcion,
    descuento_global,
    sub_total,
    monto_neto,
    monto_exento,
    iva,
    total,
    comentario,
    productos,
    insumos,
  } = req.body;

  try {
    if (
      !id_cliente ||
      !tipo_documento ||
      !fecha_solicitud ||
      !fecha_entrega ||
      !productos ||
      productos.length === 0 ||
      !insumos ||
      insumos.length === 0
    ) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    const nuevaOt = await ot.create({
      id_cliente,
      tipo_documento,
      fecha_solicitud,
      fecha_entrega,
      tipo_ot,
      equipo,
      numero_serie,
      horas_trabajo,
      prioridad,
      observacion_inicial,
      observacion_final,
      descripcion,
      sub_total,
      comentario,
      descuento_global,
      monto_neto,
      monto_exento,
      iva,
      total,
    });

    const productosData = productos.map((producto) => ({
      id_ot: nuevaOt.id_ot,
      nombre_producto: producto.nombre_producto,
      cantidad_producto: producto.cantidad_producto, 
      precio_unitario: producto.precio_unitario,
      descuento_producto: producto.descuento_producto,
      recargo_producto: producto.recargo_producto,
      af_ex: producto.af_ex,
      precio_total: producto.precio_total,
    }));

    await producto.bulkCreate(productosData);

    for (const insumoData of insumos) {
      const insumoEncontrado = await insumo.findOne({
        where: { id_insumo: insumoData.id_insumo },
      });


      if (
        !insumoEncontrado ||
        insumoEncontrado.cantidad < insumoData.cantidad_insumo
      ) {
        return res.status(400).json({
          msg: `No hay suficiente stock para el insumo ${insumoData.id_insumo}. 
                Disponible: ${
                  insumoEncontrado ? insumoEncontrado.cantidad : 0
                }, 
                Solicitado: ${insumoData.cantidad_insumo}`,
        });
      }


      await insumoEncontrado.update({
        cantidad: insumoEncontrado.cantidad - insumoData.cantidad_insumo,
        stock_disponible:
          insumoEncontrado.cantidad - insumoData.cantidad_insumo, 
      });

      await otinsumo.create({
        id_ot: nuevaOt.id_ot,
        id_insumo: insumoData.id_insumo,
        cantidad_insumo: insumoData.cantidad_insumo,
        precio_unitario: insumoData.precio_unitario,
        descuento_insumo: insumoData.descuento_insumo,
        recargo_insumo: insumoData.recargo_insumo,
        af_ex_insumo: insumoData.af_ex_insumo,
        precio_total: insumoData.precio_total,
      });
    }

    res.status(201).json({
      msg: "Orden de trabajo creada correctamente",
      id_ot: nuevaOt.id_ot,
    });
  } catch (error) {
    console.error(
      "Error al crear la orden de trabajo:",
      error.response?.data || error.message
    );
    console.error("Error al crear la orden de trabajo:", error.message);
    res.status(500).json({
      msg: "Error al crear la orden de trabajo",
      error: error.message,
    });
  }
};


const updateOt = async (req, res) => {
  const { id_ot } = req.params;
  const {
    id_cliente,
    tipo_documento,
    fecha_solicitud,
    fecha_entrega,
    tipo_ot,
    equipo,
    numero_serie,
    horas_trabajo,
    prioridad,
    observacion_inicial,
    observacion_final,
    descripcion,
    descuento_global,
    sub_total,
    monto_neto,
    monto_exento,
    iva,
    total,
    comentario,
    productos,
    ot_insumo,
  } = req.body;

  try {
    const otData = await ot.findByPk(id_ot);
    if (!otData) {
      return res.status(404).json({
        msg: `No existe una orden de trabajo con el id: ${id_ot}`,
      });
    }


    const otInsumosAntiguos = await otinsumo.findAll({ where: { id_ot } });

    for (const otInsumoAntiguo of otInsumosAntiguos) {

      const insumoEncontrado = await insumo.findOne({
        where: { id_insumo: otInsumoAntiguo.id_insumo },
      });

      if (insumoEncontrado) {

        await insumoEncontrado.update({
          cantidad: insumoEncontrado.cantidad + otInsumoAntiguo.cantidad_insumo,
          stock_disponible:
            insumoEncontrado.cantidad + otInsumoAntiguo.cantidad_insumo, 
        });
      }
    }


    await producto.destroy({ where: { id_ot } });
    await otinsumo.destroy({ where: { id_ot } });


    await otData.update({
      id_cliente,
      tipo_documento,
      fecha_solicitud,
      fecha_entrega,
      tipo_ot,
      equipo,
      numero_serie,
      horas_trabajo,
      prioridad,
      observacion_inicial,
      observacion_final,
      descripcion,
      sub_total,
      comentario,
      descuento_global,
      monto_neto,
      monto_exento,
      iva,
      total,
    });

    const productosData = productos.map((producto) => ({
      id_ot,
      nombre_producto: producto.nombre_producto,
      cantidad_producto: producto.cantidad_producto,
      precio_unitario: producto.precio_unitario,
      descuento_producto: producto.descuento_producto,
      recargo_producto: producto.recargo_producto,
      af_ex: producto.af_ex,
      precio_total: producto.precio_total,
    }));

    await producto.bulkCreate(productosData);

    for (const otInsumoData of ot_insumo) {

      const insumoEncontrado = await insumo.findOne({
        where: { id_insumo: otInsumoData.id_insumo },
      });


      if (
        !insumoEncontrado ||
        insumoEncontrado.stock_disponible < otInsumoData.cantidad_insumo
      ) {
        return res.status(400).json({
          msg: `No hay suficiente cantidad del insumo ${otInsumoData.id_insumo}`,
        });
      }


      await insumoEncontrado.update({
        cantidad: insumoEncontrado.cantidad - otInsumoData.cantidad_insumo,
        stock_disponible:
          insumoEncontrado.cantidad - otInsumoData.cantidad_insumo,
      });


      await otinsumo.create({
        id_ot,
        id_insumo: otInsumoData.id_insumo,
        cantidad_insumo: otInsumoData.cantidad_insumo,
        precio_unitario: otInsumoData.precio_unitario,
        descuento_insumo: otInsumoData.descuento_insumo,
        recargo_insumo: otInsumoData.recargo_insumo,
        af_ex_insumo: otInsumoData.af_ex_insumo,
        precio_total: otInsumoData.precio_total,
      });
    }

    res.json({ msg: "Orden de trabajo actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la orden de trabajo:", error.message);
    res.status(500).json({
      msg: "Error al actualizar la orden de trabajo",
      error: error.message,
    });
  }
};


const deleteOt = async (req, res) => {
  const { id_ot } = req.params;

  try {
    const otData = await ot.findByPk(id_ot);
    if (!otData) {
      return res.status(404).json({
        msg: "No se encontró ninguna orden de trabajo para eliminar.",
      });
    }


    await producto.destroy({ where: { id_ot } });
    await otinsumo.destroy({ where: { id_ot } });

    await otData.destroy();

    res.json({ msg: "Orden de trabajo eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      msg: "Ha ocurrido un error al eliminar la orden de trabajo.",
      error,
    });
  }
};

module.exports = { getOts, getOt, newOt, updateOt, deleteOt, getPdfOt };
