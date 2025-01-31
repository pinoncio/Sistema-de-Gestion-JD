const { Insumo } = require("../models/insumoModel");
const { Categoria } = require("../models/categoriaModel");

// Obtener todos los insumos
const getInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.findAll({
      include: {
        model: Categoria, // Incluir la categoría relacionada
        attributes: ["NOMBRE_CATEGORIA"], // Solo obtener el nombre de la categoría
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

const newInsumo = async (req, res) => {
  const {
    tipo_insumo,
    nombre_insumo,
    ubicacion,
    cantidad,
    costo_unidad,
    sub_total,
    ajuste_actual,
    id_categoria,
  } = req.body;

  try {
    // Verificar existencia del nombre del insumo
    const existingInsumo = await Insumo.findOne({
      where: { NOMBRE_INSUMO: nombre_insumo },
    });
    if (existingInsumo) {
      return res.status(400).json({
        msg: "El nombre del insumo ya está en uso",
      });
    }

    // Calcular los valores automáticos
    const stock_disponible = cantidad; // Asumimos que 'cantidad' es el total disponible
    const costo_promedio = ((cantidad * costo_unidad) / cantidad).toFixed(2); // Solo redondear a 2 decimales
    const total = sub_total;
    const precio_neto = (total + total * 0.19).toFixed(2); // Solo redondear a 2 decimales

    const estado_insumo = true; // El estado es siempre 'true' al crear

    // Crear el insumo
    await Insumo.create({
      TIPO_INSUMO: tipo_insumo,
      NOMBRE_INSUMO: nombre_insumo,
      UBICACION: ubicacion,
      CANTIDAD: cantidad,
      COSTO_UNIDAD: costo_unidad,
      SUB_TOTAL: sub_total,
      AJUSTE_ACTUAL: ajuste_actual,
      STOCK_DISPONIBLE: stock_disponible,
      COSTO_PROMEDIO: parseFloat(costo_promedio), // Asegurarse que sea un número
      TOTAL: total,
      PRECIO_NETO: parseFloat(precio_neto), // Asegurarse que sea un número
      ESTADO_INSUMO: estado_insumo,
      ID_CATEGORIA: id_categoria,
    });

    return res.status(201).json({
      msg: "Insumo creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear el insumo:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el insumo",
      error,
    });
  }
};

// Actualizar un insumo
const updateInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  const {
    tipo_insumo,
    nombre_insumo,
    ubicacion,
    cantidad,
    costo_unidad,
    sub_total,
    ajuste_actual,
    id_categoria,
  } = req.body;

  const insumo = await Insumo.findOne({ where: { ID_INSUMO: id_insumo } });
  if (!insumo) {
    return res.status(404).json({
      msg: "No existe un insumo con id: " + id_insumo,
    });
  }

  try {
    // Calcular los valores automáticos
    const stock_disponible = cantidad;
    const costo_promedio = (
      (cantidad * costo_unidad) /(cantidad)
    ).toFixed(2); // Solo redondear a 2 decimales
    const total = sub_total;
    const precio_neto = (total + total * 0.19).toFixed(2); // Solo redondear a 2 decimales

    // Actualizar el insumo
    await Insumo.update(
      {
        TIPO_INSUMO: tipo_insumo,
        NOMBRE_INSUMO: nombre_insumo,
        UBICACION: ubicacion,
        CANTIDAD: cantidad,
        COSTO_UNIDAD: costo_unidad,
        SUB_TOTAL: sub_total,
        AJUSTE_ACTUAL: ajuste_actual,
        STOCK_DISPONIBLE: stock_disponible,
        COSTO_PROMEDIO: parseFloat(costo_promedio), // Asegurarse que sea un número
        TOTAL: total,
        PRECIO_NETO: parseFloat(precio_neto), // Asegurarse que sea un número
        ID_CATEGORIA: id_categoria,
      },
      { where: { ID_INSUMO: id_insumo } }
    );

    return res.json({
      msg: "Insumo actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el insumo:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el insumo",
      error: error.message || error,
    });
  }
};

// Eliminar un insumo
const deleteInsumo = async (req, res) => {
  const { id_insumo } = req.params;

  try {
    const result = await Insumo.destroy({ where: { ID_INSUMO: id_insumo } });

    if (result === 1) {
      console.log(`Insumo con ID ${id_insumo} eliminado correctamente.`);
      return res.json({ msg: "Insumo eliminado correctamente" });
    } else {
      console.log(
        `No se encontró ningún insumo con ID ${id_insumo} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún insumo para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el insumo con ID ${id_insumo}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el insumo.",
      error: error.message,
    });
  }
};

// Obtener un insumo por id
const getInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  try {
    const insumo = await Insumo.findOne({
      where: { ID_INSUMO: id_insumo },
      include: {
        model: Categoria, // Incluir la categoría relacionada
        attributes: ["NOMBRE_CATEGORIA"], // Obtener solo el nombre de la categoría
      },
    });
    if (!insumo) {
      return res.status(404).json({
        msg: "El insumo con id: " + id_insumo + " no existe",
      });
    }
    res.json(insumo);
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al encontrar el insumo con id: " + id_insumo,
      error,
    });
  }
};

const activarInsumo = async (req, res) => {
  const { id_insumo } = req.params; // Cambié a id_insumo
  const { trigger } = req.body;

  // Buscar el insumo por ID
  const insumo = await Insumo.findOne({
    where: { ID_INSUMO: id_insumo },
  });
  if (!insumo) {
    return res.status(404).json({
      msg: "El insumo ingresado no existe", // Mensaje actualizado
    });
  }

  try {
    if (trigger == 1) {
      await Insumo.update(
        {
          ESTADO_INSUMO: true, // Cambié a ESTADO_INSUMO
        },
        { where: { ID_INSUMO: id_insumo } } // Cambié a id_insumo
      );
      return res.json({
        msg: "Se ha activado el insumo con ID " + id_insumo + " correctamente", // Mensaje actualizado
      });
    } else {
      await Insumo.update(
        {
          ESTADO_INSUMO: false, // Cambié a ESTADO_INSUMO
        },
        { where: { ID_INSUMO: id_insumo } } // Cambié a id_insumo
      );
      return res.json({
        msg:
          "Se ha desactivado el insumo con ID " + id_insumo + " correctamente", // Mensaje actualizado
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg:
        "Ha ocurrido un error al activar/desactivar el insumo con ID: " +
        id_insumo, // Mensaje actualizado
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
