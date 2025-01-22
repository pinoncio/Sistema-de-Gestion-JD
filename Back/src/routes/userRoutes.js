const express = require("express");
const router = express.Router();
const {
  newUsuario,
  updateUsuario,
  loginUser,
  getUsuario,
  getUsuarios,
  deleteUsuario,
  activarUsuario,
} = require("../controllers/userController");

// Ruta para obtener todos los usuarios
router.get("/list", getUsuarios);

// Ruta para obtener un usuario específico por su id_usuario
router.get("/:id_usuario", getUsuario);

// Ruta para crear un nuevo usuario
router.post("/", newUsuario);

// Ruta para el login de un usuario
router.post("/login", loginUser);

// Ruta para actualizar un usuario por su id_usuario
router.put("/:id_usuario", updateUsuario);

// Ruta para eliminar un usuario por su id_usuario
router.delete("/:id_usuario", deleteUsuario);

// Ruta para activar/desactivar un usuario por su id_usuario
router.put("/activar/:id_usuario", activarUsuario);

module.exports = router;
