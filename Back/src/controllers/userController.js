const { usuario } = require("../models/usermodel");
const { rol } = require("../models/rolemodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuario.findAll({
      include: {
        model: rol, // incluir los roles relacionados
        attributes: ["nombre_rol"], // solo obtener el nombre del rol
      },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de usuarios.",
      error,
    });
  }
};

const newUsuario = async (req, res) => {
  const {
    nombre_usuario,
    apellido_usuario,
    rut_usuario,
    email_usuario,
    contrasenia_usuario,
    fecha_nacimiento_usuario,
    rol_usuario,
  } = req.body;

  try {
    // verificar existencia del email
    const existingUser = await usuario.findOne({
      where: { email_usuario },
    });
    if (existingUser) {
      return res.status(400).json({
        msg: "El email ingresado ya está en uso",
      });
    }

    // validar longitud mínima de la contraseña
    if (contrasenia_usuario.length < 8) {
      return res.status(400).json({
        msg: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    // encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia_usuario, 10);

    // crear el usuario
    await usuario.create({
      nombre_usuario,
      apellido_usuario,
      rut_usuario,
      email_usuario,
      contrasenia_usuario: hashedPassword,
      fecha_nacimiento_usuario,
      rol_usuario,
    });

    console.log("Usuario creado exitosamente:", {
      contrasenia_usuario: "***contraseña oculta***",
    });

    return res.status(201).json({
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el usuario",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { rut_usuario, contrasenia_usuario } = req.body;

    // buscar al usuario por su rut
    const user = await usuario.findOne({
      where: { rut_usuario },
    });

    if (!user) {
      console.error(`Rut no encontrado: ${rut_usuario}`);
      return res.status(404).json({
        msg: "El rut ingresado no es válido. Verifica tus datos.",
      });
    }

    // verificar si la cuenta está deshabilitada
    if (!user.estado_usuario) {
      console.error(`Cuenta deshabilitada para el rut: ${rut_usuario}`);
      return res.status(403).json({
        msg: "La cuenta está deshabilitada temporalmente. Contacta al administrador.",
      });
    }

    // comparar la contraseña
    const passwordMatch = await bcrypt.compare(
      contrasenia_usuario,
      user.contrasenia_usuario
    );
    if (!passwordMatch) {
      console.error(`Contraseña incorrecta para el rut: ${rut_usuario}`);
      return res.status(401).json({
        msg: "Contraseña incorrecta. Intenta nuevamente.",
      });
    }

    // generar el token
    const user_role = user.rol_usuario;
    const user_id = user.id_usuario;
    const token = jwt.sign(
      { rut_usuario, rol: user_role },
      process.env.SECRET_KEY || "prueba1",
      { expiresIn: "30m" }
    );

    // responder con el token y los datos del usuario
    res.json({
      token,
      rol: user_role,
      id_usuario: user_id,
    });
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    res.status(500).json({
      msg: "Error interno del servidor. Intenta más tarde.",
    });
  }
};

const updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const {
    nombre_usuario,
    apellido_usuario,
    rut_usuario,
    email_usuario,
    contrasenia_usuario,
    fecha_nacimiento_usuario,
    rol_usuario,
  } = req.body;

  console.log("Datos recibidos en la petición:", {
    ...req.body,
    contrasenia_usuario: "***contraseña oculta***",
  });

  const user = await usuario.findOne({ where: { id_usuario } });
  if (!user) {
    return res.status(404).json({
      msg: `No existe un usuario con id: ${id_usuario}`,
    });
  }

  try {
    // verificar que el rol existe
    if (rol_usuario) {
      const role = await rol.findOne({ where: { id_rol: rol_usuario } });
      if (!role) {
        return res.status(404).json({
          msg: "El rol especificado no existe",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(contrasenia_usuario, 10);
    // actualizar el usuario
    await user.update(
      {
        nombre_usuario,
        apellido_usuario,
        rut_usuario,
        email_usuario,
        contrasenia_usuario: hashedPassword,
        fecha_nacimiento_usuario,
        rol_usuario,
      },
      { where: { id_usuario } }
    );

    return res.json({
      msg: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el usuario",
      error: error.message || error,
    });
  }
};

const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const result = await usuario.destroy({ where: { id_usuario } });

    if (result === 1) {
      console.log(`Usuario con id ${id_usuario} eliminado correctamente.`);
      return res.json({ msg: "Usuario eliminado correctamente" });
    } else {
      console.log(
        `No se encontró ningún usuario con id ${id_usuario} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún usuario para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el usuario con id ${id_usuario}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el usuario.",
      error: error.message,
    });
  }
};

const getUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const user = await usuario.findOne({
      where: { id_usuario },
      include: {
        model: rol, // incluir el rol relacionado
        attributes: ["nombre_rol"], // obtener solo el nombre del rol
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: `El usuario con id: ${id_usuario} no existe`,
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al encontrar el usuario con id: ${id_usuario}`,
      error,
    });
  }
};

const activarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const { trigger } = req.body;

  const user = await usuario.findOne({
    where: { id_usuario },
  });
  if (!user) {
    return res.status(404).json({
      msg: "El usuario ingresado no existe",
    });
  }

  try {
    const estado = trigger === 1 ? true : false;
    await user.update({ estado_usuario: estado });

    return res.json({
      msg: `Se ha ${
        estado ? "activado" : "desactivado"
      } la cuenta del usuario ${id_usuario} correctamente`,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al activar la cuenta: ${id_usuario}`,
      error,
    });
  }
};

module.exports = {
  newUsuario,
  updateUsuario,
  loginUser,
  getUsuario,
  getUsuarios,
  deleteUsuario,
  activarUsuario,
};
