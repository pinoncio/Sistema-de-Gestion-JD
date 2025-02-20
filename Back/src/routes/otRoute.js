const express = require("express");
const router = express.Router();
const {
  getOTs,
  getOT,
  newOT,
  updateOT,
  deleteOT,
} = require("../controllers/otController");

// Definir las rutas para órdenes de trabajo
router.get("/list", getOTs); // Obtener todas las órdenes de trabajo
router.get("/:id_ot", getOT); // Obtener una orden de trabajo por ID
router.post("/", newOT); // Crear una nueva orden de trabajo
router.put("/:id_ot", updateOT); // Actualizar una orden de trabajo
router.delete("/:id_ot", deleteOT); // Eliminar una orden de trabajo

module.exports = router;
