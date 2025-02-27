const { rol } = require("../models/rolemodel");

const getRoles = async (req, res) => {
  try {
    const roles = await rol.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener la lista de roles.",
      error: error.message,
      stack: error.stack,
    });
  }
};

const newRol = async (req, res) => {
  const { nombreRol } = req.body;
  try {
    await rol.create({
      nombre_rol: nombreRol,
    });
    return res.status(201).json({
      msg: "Rol creado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Ocurrió un error al crear el rol",
      error: error.message,
      stack: error.stack,
    });
  }
};

const updateRol = async (req, res) => {
  const { idRol } = req.params;
  const { nombreRol } = req.body;
  try {
    const rolData = await rol.findOne({ where: { id_rol: idRol } });
    if (!rolData) {
      return res.status(404).json({
        msg: `No existe un rol con id: ${idRol}`,
      });
    }

    await rol.update(
      { nombre_rol: nombreRol },
      { where: { id_rol: idRol } }
    );
    return res.json({
      msg: `Rol con id ${idRol} actualizado correctamente`,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: `Ha ocurrido un error al actualizar el rol con id: ${idRol}`,
      error: error.message,
      stack: error.stack,
    });
  }
};

const deleteRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const rolData = await rol.findOne({ where: { id_rol: idRol } });
    if (!rolData) {
      return res.status(404).json({
        msg: `El rol con id: ${idRol} no existe`,
      });
    }

    await rol.destroy({ where: { id_rol: idRol } });
    return res.json({
      msg: `Rol con id ${idRol} borrado correctamente`,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: `Ha ocurrido un error al borrar el rol con id: ${idRol}`,
      error: error.message,
      stack: error.stack,
    });
  }
};

const getRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const rolData = await rol.findOne({ where: { id_rol: idRol } });
    if (!rolData) {
      return res.status(404).json({
        msg: `El rol con id: ${idRol} no existe`,
      });
    }
    res.json(rolData);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: `Ha ocurrido un error al encontrar el rol con id: ${idRol}`,
      error: error.message,
      stack: error.stack,
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
