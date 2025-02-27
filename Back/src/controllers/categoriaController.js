const { categoria } = require("../models/categoriamodel");

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de categorías.",
      error: error.message || error,
    });
  }
};

const newCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;
  try {
    const nuevaCategoria = await categoria.create({
      nombre_categoria,
    });
    return res.status(201).json({
      msg: "Categoría creada correctamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrió un error al crear la categoría",
      error: error.message || error,
    });
  }
};

const updateCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria } = req.body;

  try {
    const categoriaToUpdate = await categoria.findOne({
      where: { id_categoria },
    });
    if (!categoriaToUpdate) {
      return res.status(404).json({
        msg: `No existe una categoría con id: ${id_categoria}`,
      });
    }

    await categoriaToUpdate.update({ nombre_categoria });
    return res.json({
      msg: `Categoría con id ${id_categoria} actualizada correctamente`,
      categoria: categoriaToUpdate,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al actualizar la categoría con id: ${id_categoria}`,
      error: error.message || error,
    });
  }
};

const deleteCategoria = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    const categoriaToDelete = await categoria.findOne({
      where: { id_categoria },
    });
    if (!categoriaToDelete) {
      return res.status(404).json({
        msg: `La categoría con id: ${id_categoria} no existe`,
      });
    }

    await categoriaToDelete.destroy();
    return res.json({
      msg: `Categoría con id ${id_categoria} borrada correctamente`,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al borrar la categoría con id: ${id_categoria}`,
      error: error.message || error,
    });
  }
};

const getCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  try {
    const categoriaToFind = await categoria.findOne({
      where: { id_categoria },
    });
    if (!categoriaToFind) {
      return res.status(404).json({
        msg: `La categoría con id: ${id_categoria} no existe`,
      });
    }
    res.json(categoriaToFind);
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al encontrar la categoría con id: ${id_categoria}`,
      error: error.message || error,
    });
  }
};

module.exports = {
  getCategorias,
  newCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
};
