const { insumo } = require("../models/insumomodel");
const { categoria } = require("../models/categoriamodel");

const getInsumos = async (req, res) => {
  try {
    const insumos = await insumo.findAll({
      include: {
        model: categoria,
        attributes: ["nombre_categoria"],
      },
    });
    res.json(insumos);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de insumos.",
      error,
    });
  }
};

const getInsumo = async (req, res) => {
  const id = parseInt(req.params.id_insumo, 10);

  if (isNaN(id)) {
    return res.status(400).json({ msg: "ID de insumo inválido." });
  }

  try {
    const insumoEncontrado = await insumo.findOne({
      where: { id_insumo: id },
      include: {
        model: categoria,
        attributes: ["nombre_categoria"],
      },
    });

    if (!insumoEncontrado) {
      return res.status(404).json({
        msg: `El insumo con id ${id} no existe.`,
      });
    }

    res.json(insumoEncontrado);
  } catch (error) {
    console.error("Error en getInsumo:", error);
    res.status(500).json({
      msg: `Ha ocurrido un error al encontrar el insumo con id: ${id}`,
      error: error.message || error,
    });
  }
};

const newInsumo = async (req, res) => {
  const {
    tipo_insumo,
    nombre_insumo,
    ubicacion,
    cantidad,
    costo_unidad,
    sub_total,
    id_categoria,
  } = req.body;

  try {
    const existingInsumo = await insumo.findOne({
      where: { nombre_insumo: nombre_insumo },
    });
    if (existingInsumo) {
      return res.status(400).json({
        msg: "El nombre del insumo ya está en uso.",
      });
    }

    const stock_disponible = cantidad;
    if (isNaN(sub_total)) {
      return res
        .status(400)
        .json({ msg: "sub_total debe ser números válidos." });
    }
    const precio_venta = parseFloat(sub_total).toFixed(2);

    const precio_neto = sub_total;
    const estado_insumo = true;

    await insumo.create({
      tipo_insumo: tipo_insumo,
      nombre_insumo: nombre_insumo,
      ubicacion: ubicacion,
      cantidad: cantidad,
      costo_unidad: costo_unidad,
      sub_total: sub_total,
      stock_disponible: stock_disponible,
      precio_venta: precio_venta,
      precio_neto: precio_neto,
      estado_insumo: estado_insumo,
      id_categoria: id_categoria,
    });

    return res.status(201).json({
      msg: "Insumo creado correctamente.",
    });
  } catch (error) {
    console.error("Error al crear el insumo:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el insumo.",
      error,
    });
  }
};

const updateInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  const {
    tipo_insumo,
    nombre_insumo,
    ubicacion,
    cantidad,
    costo_unidad,
    sub_total,
    id_categoria,
  } = req.body;

  const existingInsumo = await insumo.findOne({
    where: { id_insumo: id_insumo },
  });
  if (!existingInsumo) {
    return res.status(404).json({
      msg: "No existe un insumo con id: " + id_insumo,
    });
  }

  try {
    const stock_disponible =
      existingInsumo.stock_disponible !== cantidad
        ? cantidad
        : existingInsumo.stock_disponible;

    if (isNaN(sub_total)) {
      return res
        .status(400)
        .json({ msg: "sub_total deben ser números válidos." });
    }
    const precio_venta = parseFloat(sub_total).toFixed(2);

    const precio_neto = sub_total;

    await insumo.update(
      {
        tipo_insumo: tipo_insumo,
        nombre_insumo: nombre_insumo,
        ubicacion: ubicacion,
        cantidad: cantidad,
        costo_unidad: costo_unidad,
        sub_total: sub_total,
        stock_disponible: stock_disponible,
        precio_venta: precio_venta,
        precio_neto: precio_neto,
        id_categoria: id_categoria,
      },
      { where: { id_insumo: id_insumo } }
    );

    return res.json({
      msg: "Insumo actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el insumo:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el insumo.",
      error: error.message || error,
    });
  }
};

const deleteInsumo = async (req, res) => {
  const { id_insumo } = req.params;

  try {
    const result = await insumo.destroy({ where: { id_insumo: id_insumo } });

    if (result === 1) {
      console.log(`Insumo con id ${id_insumo} eliminado correctamente.`);
      return res.json({ msg: "Insumo eliminado correctamente." });
    } else {
      console.log(
        `No se encontró ningún insumo con id ${id_insumo} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún insumo para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el insumo con id ${id_insumo}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el insumo.",
      error: error.message,
    });
  }
};

const activarInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  const { trigger } = req.body;

  const existingInsumo = await insumo.findOne({
    where: { id_insumo: id_insumo },
  });
  if (!existingInsumo) {
    return res.status(404).json({
      msg: "El insumo ingresado no existe.",
    });
  }

  try {
    if (trigger == 1) {
      await insumo.update(
        {
          estado_insumo: true,
        },
        { where: { id_insumo: id_insumo } }
      );
      return res.json({
        msg: "Se ha activado el insumo con id " + id_insumo + " correctamente.",
      });
    } else {
      await insumo.update(
        {
          estado_insumo: false,
        },
        { where: { id_insumo: id_insumo } }
      );
      return res.json({
        msg:
          "Se ha desactivado el insumo con id " + id_insumo + " correctamente.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg:
        "Ha ocurrido un error al activar/desactivar el insumo con id: " +
        id_insumo,
      error,
    });
  }
};

module.exports = {
  newInsumo,
  updateInsumo,
  getInsumo,
  getInsumos,
  deleteInsumo,
  activarInsumo,
};
