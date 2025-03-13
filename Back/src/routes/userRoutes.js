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
} = require("../controllers/usercontroller");

router.get("/list", getUsuarios);

router.get("/:id_usuario", getUsuario);

router.post("/", newUsuario);

router.post("/login", loginUser);

router.put("/:id_usuario", updateUsuario);

router.delete("/:id_usuario", deleteUsuario);

router.put("/activar/:id_usuario", activarUsuario);

module.exports = router;
