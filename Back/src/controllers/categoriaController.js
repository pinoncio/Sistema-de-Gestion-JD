const { Categoria } = require("../models/categoriaModel");

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de categorías.",
      error,
    });
  }
};

const newCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;
  try {
    await Categoria.create({
      NOMBRE_CATEGORIA: nombre_categoria,
    });
    return res.status(201).json({
      msg: "Categoría creada correctamente",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrió un error al crear la categoría",
      error,
    });
  }
};

const updateCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nombre_categoria } = req.body;
  const categoria = await Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
  if (!categoria) {
    return res.status(404).json({
      msg: "No existe una categoría con id: " + id_categoria,
    });
  }
  try {
    await Categoria.update(
      { NOMBRE_CATEGORIA: nombre_categoria },
      { where: { ID_CATEGORIA: id_categoria } }
    );
    return res.json({
      msg: "Categoría " + id_categoria + " actualizada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar la categoría: " + id_categoria,
      error,
    });
  }
};

const deleteCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const categoria = await Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
  if (!categoria) {
    return res.status(404).json({
      msg: "La categoría con id: " + id_categoria + " no existe",
    });
  }
  try {
    await Categoria.destroy({ where: { ID_CATEGORIA: id_categoria } });
    return res.json({
      msg: "Categoría con id " + id_categoria + " borrada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al borrar la categoría con id: " + id_categoria,
      error,
    });
  }
};

const getCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  try {
    const categoria = await Categoria.findOne({ where: { ID_CATEGORIA: id_categoria } });
    if (!categoria) {
      return res.status(404).json({
        msg: "La categoría con id: " + id_categoria + " no existe",
      });
    }
    res.json(categoria);
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al encontrar la categoría con id: " + id_categoria,
      error,
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
