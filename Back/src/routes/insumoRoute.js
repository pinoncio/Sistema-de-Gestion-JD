const express = require("express");
const router = express.Router();
const {
  newInsumo,
  updateInsumo,
  getInsumo,
  getInsumos,
  deleteInsumo,
  activarInsumo,
} = require("../controllers/insumocontroller");

// Ruta para obtener todos los insumos
router.get("/list", getInsumos);

// Ruta para obtener un insumo específico por su id_insumo
router.get("/:id_insumo", getInsumo);

// Ruta para crear un nuevo insumo
router.post("/", newInsumo);

// Ruta para actualizar un insumo por su id_insumo
router.put("/:id_insumo", updateInsumo);

// Ruta para eliminar un insumo por su id_insumo
router.delete("/:id_insumo", deleteInsumo);

// Ruta para activar/desactivar un insumo por su id_insumo
router.put("/activar/:id_insumo", activarInsumo);

module.exports = router;
