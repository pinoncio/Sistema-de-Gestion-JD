const { otinsumo } = require("../models/otinsumomodel");
const { ot } = require("../models/otmodel");
const { insumo } = require("../models/insumomodel");

const getInsumosByOt = async (req, res) => {
  const { id_ot } = req.params;
  try {
    console.log("Modelo otinsumo:", otinsumo);

    if (!otinsumo) {
      return res
        .status(500)
        .json({ msg: "Modelo otinsumo no cargado correctamente" });
    }

    const otInsumos = await otinsumo.findAll({
      where: { id_ot },
      include: [
        {
          model: ot,
          as: "ot",
          attributes: ["id_ot", "tipo_documento", "fecha_solicitud"],
        },
        {
          model: insumo,
          as: "insumo",
          attributes: ["nombre_insumo", "precio_venta", "cantidad"],
        },
      ],
    });

    if (otInsumos.length === 0) {
      return res
        .status(404)
        .json({ msg: `No se encontraron insumos para la OT con id: ${id_ot}` });
    }

    res.json(otInsumos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los insumos de la orden de trabajo.",
      error: error.message,
      stack: error.stack,
    });
  }
};

const getInsumoById = async (req, res) => {
  const { id_ot, id_insumo } = req.params;
  try {
    console.log("Modelo otinsumo:", otinsumo);

    if (!otinsumo) {
      return res
        .status(500)
        .json({ msg: "Modelo otinsumo no cargado correctamente" });
    }

    const otInsumoData = await otinsumo.findOne({
      where: { id_ot, id_insumo },
      include: [
        {
          model: ot,
          as: "ot",
          attributes: ["id_ot", "tipo_documento", "fecha_solicitud"],
        },
        {
          model: insumo,
          as: "insumo",
          attributes: ["nombre_insumo", "precio_venta", "cantidad"],
        },
      ],
    });

    if (!otInsumoData) {
      return res.status(404).json({
        msg: `No se encontró la relación entre la OT ${id_ot} y el insumo ${id_insumo}`,
      });
    }

    res.json(otInsumoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el insumo de la orden de trabajo.",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = { getInsumosByOt, getInsumoById };
