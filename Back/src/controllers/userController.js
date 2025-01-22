"use strict";
const { Usuario } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newUsuario = async (req, res) => {
  const {
    email,
    rut_usuario,
    contrasenia,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
  } = req.body;
  const usuarioCorreo = await Usuario.findOne({
    where: { EMAIL_USUARIO: email },
  });
  const usuarioRut = await Usuario.findOne({
    where: { RUT_USUARIO: rut_usuario },
  });

  if (usuarioCorreo) {
    return res
      .status(400)
      .json({ msg: "Ya existe una cuenta con el email ingresado" });
  }
  if (usuarioRut) {
    return res
      .status(400)
      .json({ msg: "Ya existe un usuario con el rut ingresado" });
  }

  const hashedpassword = await bcrypt.hash(contrasenia, 10);
  try {
    await Usuario.create({
      RUT_USUARIO: rut_usuario,
      CONTRASENIA_USUARIO: hashedpassword,
      NOMBRE1_USUARIO: nombre1_usuario,
      NOMBRE2_USUARIO: nombre2_usuario,
      APELLIDO1_USUARIO: apellido1_usuario,
      APELLIDO2_USUARIO: apellido2_usuario,
      EMAIL_USUARIO: email,
    });
    return res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Ha ocurrido un error al crear una cuenta", error });
  }
};

const updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const {
    email,
    rut_usuario,
    contrasenia,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
  } = req.body;
  const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });

  if (!usuario) {
    return res.status(404).json({ msg: "El usuario ingresado no existe" });
  }
  if (!usuario.ESTADO_CUENTA) {
    return res
      .status(400)
      .json({ msg: "La cuenta está suspendida, contacte a soporte" });
  }

  try {
    const updateData = {
      RUT_USUARIO: rut_usuario,
      NOMBRE1_USUARIO: nombre1_usuario,
      NOMBRE2_USUARIO: nombre2_usuario,
      APELLIDO1_USUARIO: apellido1_usuario,
      APELLIDO2_USUARIO: apellido2_usuario,
      EMAIL_USUARIO: email,
    };
    if (contrasenia) {
      updateData.CONTRASENIA_USUARIO = await bcrypt.hash(contrasenia, 10);
    }
    await Usuario.update(updateData, { where: { ID_USUARIO: id_usuario } });
    return res.json({
      msg: "Información de la cuenta actualizada correctamente",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Error al actualizar la información", error });
  }
};

const loginUser = async (req, res) => {
  const { email, contrasenia } = req.body;
  const usuario = await Usuario.findOne({ where: { EMAIL_USUARIO: email } });

  if (!usuario) {
    return res.status(401).json({ msg: "Email no válido" });
  }
  if (!usuario.ESTADO_CUENTA) {
    return res
      .status(401)
      .json({ msg: "Cuenta bloqueada, contacte al administrador" });
  }

  const passwordMatch = await bcrypt.compare(
    contrasenia,
    usuario.CONTRASENIA_USUARIO
  );
  if (!passwordMatch) {
    return res.status(401).json({ msg: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { email, rol: usuario.ID_ROL_USUARIO },
    process.env.JWT_SECRE || "PRUEBA1",
    { expiresIn: "30m" }
  );
  res.json({
    token,
    rol: usuario.ID_ROL_USUARIO,
    idUsuario: usuario.ID_USUARIO,
  });
};

const getUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: { ID_USUARIO: id_usuario },
    });
    if (!usuario) {
      return res
        .status(404)
        .json({ msg: `El usuario con id: ${id_usuario} no existe` });
    }
    res.json(usuario);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: `Error al encontrar usuario con id: ${id_usuario}`, error });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    return res.status(400).json({ msg: "Error al obtener usuarios", error });
  }
};

const deleteUsuario = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;

    try {
      // Verificar si el usuario existe
      const usuario = yield Usuario.findOne({
        where: { ID_USUARIO: id_usuario },
      });

      if (!usuario) {
        return res.status(404).json({
          msg: `El usuario con id: ${id_usuario} no existe`,
        });
      }

      // Eliminar el usuario
      yield usuarioModel_1.Usuario.destroy({
        where: { ID_USUARIO: id_usuario },
      });

      return res.json({
        msg: `El usuario con id: ${id_usuario} ha sido eliminado correctamente`,
      });
    } catch (error) {
      return res.status(500).json({
        msg: `Ha ocurrido un error al intentar eliminar el usuario con id: ${id_usuario}`,
        error,
      });
    }
  });

module.exports = {
  newUsuario,
  updateUsuario,
  loginUser,
  getUsuario,
  getUsuarios,
  deleteUsuario,
};
