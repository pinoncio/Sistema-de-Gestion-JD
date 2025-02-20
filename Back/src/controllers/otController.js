const { OT } = require("../models/otModel");
const { Cliente } = require("../models/clienteModel");
const { Insumo } = require("../models/insumoModel");

// Obtener todas las órdenes de trabajo
const getOTs = async (req, res) => {
  try {
    const ots = await OT.findAll({
      include: [
        { model: Cliente, attributes: ["NOMBRE_RAZON_SOCIAL"] },
        { model: Insumo, attributes: ["NOMBRE_INSUMO"] },
      ],
    });
    res.json(ots);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al obtener las órdenes de trabajo.", error });
  }
};

// Obtener una orden de trabajo por ID
const getOT = async (req, res) => {
  const { id_ot } = req.params;
  try {
    const ot = await OT.findOne({
      where: { ID_OT: id_ot },
      include: [
        {
          model: Cliente,
          attributes: ["NOMBRE_RAZON_SOCIAL"],
        },
        {
          model: Insumo,
          attributes: ["NOMBRE_INSUMO"],
        },
      ],
    });

    if (!ot) {
      return res.status(404).json({
        msg: `La orden de trabajo con id: ${id_ot} no existe`,
      });
    }
    res.json(ot);
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al buscar la orden de trabajo con id: ${id_ot}`,
      error,
    });
  }
};

// Crear una nueva orden de trabajo
const newOT = async (req, res) => {
  const {
    id_cliente,
    id_insumo,
    tipo_documento,
    fecha_solicitud,
    fecha_entrega,
    tipo_ot,
    equipo,
    numero_serie,
    horas_trabajo,
    observacion_final,
    descripcion,
    cantidad,
    precio_neto,
    descuento,
    recargo,
    comentario,
    descuento_global,
    af_ex,
    sub_total,
    monto_neto,
    monto_exento,
    iva,
    total,
  } = req.body;

  try {
    // Validar si los campos obligatorios están presentes
    if (
      !id_cliente ||
      !id_insumo ||
      !tipo_documento ||
      !fecha_solicitud ||
      !fecha_entrega
    ) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    // Crear la orden de trabajo sin cálculos en el backend
    const nuevaOT = await OT.create({
      ID_CLIENTE: id_cliente,
      ID_INSUMO: id_insumo,
      TIPO_DOCUMENTO: tipo_documento,
      FECHA_SOLICITUD: fecha_solicitud,
      FECHA_ENTREGA: fecha_entrega,
      TIPO_OT: tipo_ot,
      EQUIPO: equipo,
      NUMERO_SERIE: numero_serie,
      HORAS_TRABAJO: horas_trabajo,
      OBSERVACION_FINAL: observacion_final,
      DESCRIPCION: descripcion,
      CANTIDAD: cantidad,
      PRECIO_NETO: precio_neto,
      DESCUENTO: descuento,
      RECARGO: recargo,
      AF_EX: af_ex,
      SUB_TOTAL: sub_total,
      MONTO_NETO: monto_neto,
      MONTO_EXENTO: monto_exento,
      IVA: iva,
      TOTAL: total,
      COMENTARIO: comentario,
      DESCUENTO_GLOBAL: descuento_global,
    });

    res.status(201).json({
      msg: "Orden de trabajo creada correctamente",
      id_ot: nuevaOT.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error al crear la orden de trabajo",
      error,
    });
  }
};

// Actualizar una orden de trabajo
const updateOT = async (req, res) => {
  const { id_ot } = req.params;
  const {
    id_cliente,
    id_insumo,
    tipo_documento,
    fecha_solicitud,
    fecha_entrega,
    tipo_ot,
    equipo,
    numero_serie,
    horas_trabajo,
    observacion_final,
    descripcion,
    cantidad,
    precio_neto,
    descuento,
    recargo,
    comentario,
    descuento_global,
    af_ex,
    sub_total,
    monto_neto,
    monto_exento,
    iva,
    total,
  } = req.body;

  try {
    // Buscar la orden de trabajo
    const ot = await OT.findByPk(id_ot);
    if (!ot) {
      return res
        .status(404)
        .json({ msg: "No existe una orden de trabajo con el ID: " + id_ot });
    }

    // Actualizar la orden de trabajo sin cálculos en el backend
    await ot.update({
      ID_CLIENTE: id_cliente,
      ID_INSUMO: id_insumo,
      TIPO_DOCUMENTO: tipo_documento,
      FECHA_SOLICITUD: fecha_solicitud,
      FECHA_ENTREGA: fecha_entrega,
      TIPO_OT: tipo_ot,
      EQUIPO: equipo,
      NUMERO_SERIE: numero_serie,
      HORAS_TRABAJO: horas_trabajo,
      OBSERVACION_FINAL: observacion_final,
      DESCRIPCION: descripcion,
      CANTIDAD: cantidad,
      PRECIO_NETO: precio_neto,
      DESCUENTO: descuento,
      RECARGO: recargo,
      AF_EX: af_ex,
      SUB_TOTAL: sub_total,
      MONTO_NETO: monto_neto,
      MONTO_EXENTO: monto_exento,
      IVA: iva,
      TOTAL: total,
      COMENTARIO: comentario,
      DESCUENTO_GLOBAL: descuento_global,
    });

    res.json({ msg: "Orden de trabajo actualizada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error al actualizar la orden de trabajo",
      error,
    });
  }
};

// Eliminar una orden de trabajo
const deleteOT = async (req, res) => {
  const { id_ot } = req.params;

  try {
    // Buscar la orden de trabajo por ID
    const ot = await OT.findByPk(id_ot);
    if (!ot) {
      return res.status(404).json({
        msg: "No se encontró ninguna orden de trabajo para eliminar.",
      });
    }

    // Eliminar la orden de trabajo
    await ot.destroy();

    res.json({ msg: "Orden de trabajo eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      msg: "Ha ocurrido un error al eliminar la orden de trabajo.",
      error,
    });
  }
};

module.exports = { getOTs, getOT, newOT, updateOT, deleteOT };
