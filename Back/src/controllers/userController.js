const { Usuario } = require("../models/userModel");
const { Rol } = require("../models/roleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: {
        model: Rol, // Incluir los roles relacionados
        attributes: ["NOMBRE_ROL"], // Solo obtener el nombre del rol
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

// Crear un nuevo usuario
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
    // Verificar existencia del email
    const existingUser = await Usuario.findOne({
      where: { EMAIL_USUARIO: email_usuario },
    });
    if (existingUser) {
      return res.status(400).json({
        msg: "El email ingresado ya está en uso",
      });
    }

    // Validar longitud mínima de la contraseña (ejemplo: mínimo 8 caracteres)
    if (contrasenia_usuario.length < 8) {
      return res.status(400).json({
        msg: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia_usuario, 10);

    // Crear el usuario
    await Usuario.create({
      NOMBRE_USUARIO: nombre_usuario,
      APELLIDO_USUARIO: apellido_usuario,
      RUT_USUARIO: rut_usuario,
      EMAIL_USUARIO: email_usuario,
      CONTRASENIA_USUARIO: hashedPassword,
      FECHA_NACIMIENTO_USUARIO: fecha_nacimiento_usuario,
      ROL_USUARIO: rol_usuario,
    });

    console.log("Usuario creado exitosamente:", {
      // ... resto de los datos del usuario
      contrasenia_usuario: "***CONTRASEÑA OCULTA***",
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

    // Buscar al usuario por su RUT
    const usuario = await Usuario.findOne({
      where: { RUT_USUARIO: rut_usuario },
    });

    if (!usuario) {
      // Si el RUT no existe
      console.error(`RUT no encontrado: ${rut_usuario}`);  // Imprime el RUT ingresado
      return res.status(404).json({
        msg: "El RUT ingresado no es válido. Verifica tus datos.",
      });
    }

    // Verificar si la cuenta está deshabilitada
    if (!usuario.ESTADO_USUARIO) {
      console.error(`Cuenta deshabilitada para el RUT: ${rut_usuario}`);  // Imprime el RUT si la cuenta está deshabilitada
      return res.status(403).json({
        msg: "La cuenta está deshabilitada temporalmente. Contacta al administrador.",
      });
    }

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(
      contrasenia_usuario,
      usuario.CONTRASENIA_USUARIO
    );
    if (!passwordMatch) {
      // Si la contraseña es incorrecta
      console.error(`Contraseña incorrecta para el RUT: ${rut_usuario}`);  // Imprime cuando la contraseña es incorrecta
      return res.status(401).json({
        msg: "Contraseña incorrecta. Intenta nuevamente.",
      });
    }

    // Si la autenticación es exitosa, generar el token
    const usuarioRol = usuario.ROL_USUARIO;
    const usuarioId = usuario.ID_USUARIO;
    const token = jwt.sign(
      {
        rut_usuario: rut_usuario,
        rol: usuarioRol,
      },
      process.env.SECRET_KEY || "PRUEBA1",
      { expiresIn: "30m" }
    );

    // Responder con el token y los datos del usuario
    res.json({
      token,
      rol: usuarioRol,
      idUsuario: usuarioId,
    });
  } catch (error) {
    console.error("Error en el proceso de login:", error);  // Imprime el error completo
    res.status(500).json({
      msg: "Error interno del servidor. Intenta más tarde.",
    });
  }
};

// Actualizar un usuario
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
    contrasenia_usuario: "***CONTRASEÑA OCULTA***",
  });

  const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
  if (!usuario) {
    return res.status(404).json({
      msg: "No existe un usuario con id: " + id_usuario,
    });
  }

  try {
    // Verificar que el rol existe (opcional)
    if (rol_usuario) {
      const rol = await Rol.findOne({ where: { ID_ROL: rol_usuario } });
      if (!rol) {
        return res.status(404).json({
          msg: "El rol especificado no existe",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(contrasenia_usuario, 10);
    // Actualizar el usuario
    await Usuario.update(
      {
        NOMBRE_USUARIO: nombre_usuario,
        APELLIDO_USUARIO: apellido_usuario,
        RUT_USUARIO: rut_usuario,
        EMAIL_USUARIO: email_usuario,
        CONTRASENIA_USUARIO: hashedPassword,
        FECHA_NACIMIENTO_USUARIO: fecha_nacimiento_usuario,
        ROL_USUARIO: rol_usuario,
      },
      { where: { ID_USUARIO: id_usuario } }
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

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const result = await Usuario.destroy({ where: { ID_USUARIO: id_usuario } });

    if (result === 1) {
      console.log(`Usuario con ID ${id_usuario} eliminado correctamente.`);
      return res.json({ msg: "Usuario eliminado correctamente" });
    } else {
      console.log(
        `No se encontró ningún usuario con ID ${id_usuario} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún usuario para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id_usuario}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el usuario.",
      error: error.message,
    });
  }
};

// Obtener un usuario por id
const getUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: { ID_USUARIO: id_usuario },
      include: {
        model: Rol, // Incluir el rol relacionado
        attributes: ["NOMBRE_ROL"], // Obtener solo el nombre del rol
      },
    });
    if (!usuario) {
      return res.status(404).json({
        msg: "El usuario con id: " + id_usuario + " no existe",
      });
    }
    res.json(usuario);
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al encontrar el usuario con id: " + id_usuario,
      error,
    });
  }
};

const activarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const { trigger } = req.body;

  // Usar directamente 'Usuario' sin 'usuarioModel_1'
  const usuario = await Usuario.findOne({
    where: { ID_USUARIO: id_usuario },
  });
  if (!usuario) {
    return res.status(404).json({
      msg: "El usuario ingresado no existe",
    });
  }

  try {
    if (trigger == 1) {
      await Usuario.update(
        {
          ESTADO_USUARIO: true, // Cambiado a estado_usuario
        },
        { where: { ID_USUARIO: id_usuario } }
      );
      return res.json({
        msg:
          "Se ha activado la cuenta del usuario " +
          id_usuario +
          " correctamente",
      });
    } else {
      await Usuario.update(
        {
          ESTADO_USUARIO: false, // Cambiado a estado_usuario
        },
        { where: { ID_USUARIO: id_usuario } }
      );
      return res.json({
        msg:
          "Se ha desactivado la cuenta del usuario " +
          id_usuario +
          " correctamente",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al activar la cuenta : " + id_usuario,
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
