const { controltiempo } = require("../models/controltiempomodel");
const { it } = require("../models/informemodel");

const getAllTiempo = async (req, res) => {
  try {
    const controltiempos = await controltiempo.findAll({
      include: [
        {
          model: it,
          as: "informe_trabajo",
          attributes: ["id_it"],
        },
      ],
    });

    res.json(controltiempos);
  } catch (error) {
    console.error("Error al obtener la lista de tiempos:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de tiempos.",
      error: error.message,
    });
  }
};

const getTiempoByIt = async (req, res) => {
  const { id_it } = req.params;

  try {
    const controltiempos = await controltiempo.findAll({
      where: { id_it },
      include: [
        {
          model: it,
          as: "informe_trabajo",
          attributes: ["id_it"],
        },
      ],
    });

    if (!controltiempos.length) {
      return res.status(404).json({
        msg: `No se encontraron registros para id_it: ${id_it}`,
      });
    }

    res.json(controltiempos);
  } catch (error) {
    console.error(`Error al obtener tiempos para id_it ${id_it}:`, error);
    res.status(500).json({
      msg: "Error interno del servidor.",
      error: error.message,
    });
  }
};

module.exports = { getAllTiempo, getTiempoByIt };
