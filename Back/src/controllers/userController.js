const { Usuario } = require("../models/userModel");
const { Rol } = require("../models/roleModel");

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
    // Verificar que el rol existe
    const rol = await Rol.findOne({ where: { ID_ROL: rol_usuario } });
    if (!rol) {
      return res.status(404).json({
        msg: "El rol especificado no existe",
      });
    }

    // Crear el usuario
    await Usuario.create({
      NOMBRE_USUARIO: nombre_usuario,
      APELLIDO_USUARIO: apellido_usuario,
      RUT_USUARIO: rut_usuario,
      EMAIL_USUARIO: email_usuario,
      CONTRASENIA_USUARIO: contrasenia_usuario,
      FECHA_NACIMIENTO_USUARIO: fecha_nacimiento_usuario,
      ROL_USUARIO: rol_usuario, // Relación con el rol
    });

    return res.status(201).json({
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrió un error al crear el usuario",
      error,
    });
  }
};

const loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasenia } = req.body;
    const usuario = yield usuarioModel_1.Usuario.findOne({
      where: { EMAIL_USUARIO: email },
    });
    if (!usuario) {
      return res.status(401).json({
        msg: "El email ingresado no es valido",
      });
    }
    if (usuario.ESTADO_CUENTA == false) {
      return res.status(401).json({
        msg: "La cuenta esta bloqueada, porfavor contacta al administrador",
      });
    }
    const password = yield bcrypt_1.default.compare(
      contrasenia,
      usuario.CONTRASENIA_USUARIO
    );
    if (!password) {
      return res.status(401).json({
        msg: "Contraseña Incorrecta",
      });
    }
    const usuarioRol = usuario.dataValues.ID_ROL_USUARIO;
    const usuarioId = usuario.dataValues.ID_USUARIO;
    const token = jsonwebtoken_1.default.sign(
      {
        email: email,
        rol: usuarioRol,
      },
      process.env.SECRET_KEY || "PRUEBA1",
      { expiresIn: "30m" }
    ); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({ token, rol: usuarioRol, idUsuario: usuarioId });
  });

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  console.log(id_usuario);
  const {
    nombre_usuario,
    apellido_usuario,
    rut_usuario,
    email_usuario,
    contrasenia_usuario,
    fecha_nacimiento_usuario,
    rol_usuario,
  } = req.body;

  const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
  if (!usuario) {
    return res.status(404).json({
      msg: "No existe un usuario con id: " + id_usuario,
    });
  }

  try {
    // Verificar que el rol existe
    const rol = await Rol.findOne({ where: { ID_ROL: rol_usuario } });
    if (!rol) {
      return res.status(404).json({
        msg: "El rol especificado no existe",
      });
    }

    // Actualizar el usuario
    await Usuario.update(
      {
        NOMBRE_USUARIO: nombre_usuario,
        APELLIDO_USUARIO: apellido_usuario,
        RUT_USUARIO: rut_usuario,
        EMAIL_USUARIO: email_usuario,
        CONTRASENIA_USUARIO: contrasenia_usuario,
        FECHA_NACIMIENTO_USUARIO: fecha_nacimiento_usuario,
        ROL_USUARIO: rol_usuario, // Relación con el rol
      },
      { where: { ID_USUARIO: id_usuario } }
    );

    return res.json({
      msg: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error); // Esto imprimirá el error en la consola
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el usuario",
      error: error.message || error, // Incluye el mensaje del error
    });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const usuario = await Usuario.findOne({ where: { ID_USUARIO: id_usuario } });
  if (!usuario) {
    return res.status(404).json({
      msg: "El usuario con id: " + id_usuario + " no existe",
    });
  }

  try {
    await Usuario.destroy({ where: { ID_USUARIO: id_usuario } });
    return res.json({
      msg: "Usuario con id " + id_usuario + " borrado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Ha ocurrido un error al borrar el usuario con id: " + id_usuario,
      error,
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
