const { maquina } = require("../models/maquinamodel");
const { cliente } = require("../models/clientemodel");
const { ot } = require("../models/otmodel");
const { it } = require("../models/informemodel");
const { controltiempo } = require("../models/controltiempomodel");

const getMaquinas = async (req, res) => {
  try {
    const maquinas = await maquina.findAll({
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social"],
        },
        {
          model: ot,
          attributes: [
            "id_ot",
            "tipo_ot",
            "fecha_solicitud",
            "fecha_entrega",
            "equipo",
            "total",
          ],
        },
        {
          model: it,
          attributes: [
            "id_it",
            "tecnico",
            "horometro",
            "queja_sintoma",
            "diagnostico",
            "solucion",
            "total_hh",
          ],
          include: [
            {
              model: controltiempo,
              as: "control_tiempo",
              attributes: [
                "id_control_tiempo",
                "fecha",
                "viaje_ida",
                "trabajo",
                "viaje_vuelta",
                "total_hh_viaje",
                "total_hh_trabajo",
              ],
            },
          ],
        },
      ],
    });

    res.json(maquinas);
  } catch (error) {
    console.error("Error en getMaquinas:", error);
    res.status(500).json({
      msg: "Error al obtener la lista de máquinas.",
      error: error.message || error,
    });
  }
};

const getMaquina = async (req, res) => {
  const id = parseInt(req.params.id_maquina, 10);

  if (isNaN(id)) {
    return res.status(400).json({ msg: "ID de máquina inválido." });
  }

  try {
    const maquinaEncontrada = await maquina.findOne({
      where: { id_maquina: id },
      include: [
        {
          model: cliente,
          as: "cliente",
          attributes: ["nombre_razon_social"],
        },
        {
          model: ot,
          attributes: [
            "id_ot",
            "tipo_ot",
            "fecha_solicitud",
            "fecha_entrega",
            "equipo",
            "total",
          ],
        },
        {
          model: it,
          attributes: [
            "id_it",
            "tecnico",
            "diagnostico",
            "solucion",
          ],
          include: [
            {
              model: controltiempo,
              as: "control_tiempo",
              attributes: [
                "id_control_tiempo",
                "fecha",
              ],
            },
          ],
        },
      ],
    });

    if (!maquinaEncontrada) {
      return res.status(404).json({
        msg: `La máquina con id ${id} no existe.`,
      });
    }

    res.json(maquinaEncontrada);
  } catch (error) {
    console.error("Error en getMaquina:", error);
    res.status(500).json({
      msg: `Ha ocurrido un error al encontrar la máquina con id: ${id}`,
      error: error.message || error,
    });
  }
};

const newMaquina = async (req, res) => {
  const {
    id_cliente,
    nombre_maquina,
    modelo_maquina,
    numero_serie,
    numero_motor,
  } = req.body;

  try {
    const existingMaquina = await maquina.findOne({
      where: { numero_serie: numero_serie }, // Verifica si la máquina ya existe por número de serie
    });
    if (existingMaquina) {
      return res.status(400).json({
        msg: "El número de serie de la máquina ya está registrado.",
      });
    }

    await maquina.create({
      id_cliente: id_cliente,
      nombre_maquina: nombre_maquina,
      modelo_maquina: modelo_maquina,
      numero_serie: numero_serie,
      numero_motor: numero_motor,
    });

    return res.status(201).json({
      msg: "Máquina creada correctamente.",
    });
  } catch (error) {
    console.error("Error al crear la máquina:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear la máquina.",
      error,
    });
  }
};

const updateMaquina = async (req, res) => {
  const { id_maquina } = req.params;
  const { nombre_maquina, modelo_maquina, numero_serie, numero_motor } =
    req.body;

  const existingMaquina = await maquina.findOne({
    where: { id_maquina: id_maquina },
  });
  if (!existingMaquina) {
    return res.status(404).json({
      msg: "No existe una máquina con id: " + id_maquina,
    });
  }

  try {
    await maquina.update(
      {
        nombre_maquina: nombre_maquina,
        modelo_maquina: modelo_maquina,
        numero_serie: numero_serie,
        numero_motor: numero_motor,
      },
      { where: { id_maquina: id_maquina } }
    );

    return res.json({
      msg: "Máquina actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar la máquina:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar la máquina.",
      error: error.message || error,
    });
  }
};

const deleteMaquina = async (req, res) => {
  const { id_maquina } = req.params;

  try {
    const result = await maquina.destroy({ where: { id_maquina: id_maquina } });

    if (result === 1) {
      console.log(`Máquina con id ${id_maquina} eliminada correctamente.`);
      return res.json({ msg: "Máquina eliminada correctamente." });
    } else {
      console.log(
        `No se encontró ninguna máquina con id ${id_maquina} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ninguna máquina para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar la máquina con id ${id_maquina}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar la máquina.",
      error: error.message,
    });
  }
};

module.exports = {
  newMaquina,
  updateMaquina,
  getMaquina,
  getMaquinas,
  deleteMaquina,
};
