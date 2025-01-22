const { Rol } = require("../models/roleModel");

const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de roles.",
      error,
    });
  }
};

const newRol = async (req, res) => {
  const { nombre_rol } = req.body;
  try {
    await Rol.create({
      NOMBRE_ROL: nombre_rol,
    });
    return res.status(201).json({
      msg: "Rol creado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrió un error al crear el rol",
      error,
    });
  }
};

const updateRol = async (req, res) => {
  const { id_rol } = req.params;
  const { nombre_rol } = req.body;
  const rol = await Rol.findOne({ where: { ID_ROL: id_rol } });
  if (!rol) {
    return res.status(404).json({
      msg: "No existe un rol con id: " + id_rol,
    });
  }
  try {
    await Rol.update(
      {
        NOMBRE_ROL: nombre_rol,
      },
      { where: { ID_ROL: id_rol } }
    );
    return res.json({
      msg: "Rol " + id_rol + " actualizado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el rol: " + id_rol,
      error,
    });
  }
};

const deleteRol = async (req, res) => {
  const { id_rol } = req.params;
  const rol = await Rol.findOne({ where: { ID_ROL: id_rol } });
  if (!rol) {
    return res.status(404).json({
      msg: "El rol con id: " + id_rol + " no existe",
    });
  }
  try {
    await Rol.destroy({ where: { ID_ROL: id_rol } });
    return res.json({
      msg: "Rol con id " + id_rol + " borrado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al borrar el rol con id: " + id_rol,
      error,
    });
  }
};

const getRol = async (req, res) => {
  const { id_rol } = req.params;
  try {
    const rol = await Rol.findOne({ where: { ID_ROL: id_rol } });
    if (!rol) {
      return res.status(404).json({
        msg: "El rol con id: " + id_rol + " no existe",
      });
    }
    res.json(rol);
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al encontrar el rol con id: " + id_rol,
      error,
    });
  }
};

module.exports = {
  getRoles,
  newRol,
  updateRol,
  deleteRol,
  getRol,
};
