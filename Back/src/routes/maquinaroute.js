const express = require("express");
const router = express.Router();
const {
  newMaquina,
  updateMaquina,
  getMaquina,
  getMaquinas,
  deleteMaquina,
} = require("../controllers/maquinacontroller");

// Obtener todas las máquinas
router.get("/list", getMaquinas);

// Obtener una máquina por ID
router.get("/:id_maquina", getMaquina);

// Crear una nueva máquina
router.post("/", newMaquina);

// Actualizar una máquina por ID
router.put("/:id_maquina", updateMaquina);

// Eliminar una máquina por ID
router.delete("/:id_maquina", deleteMaquina);

module.exports = router;
