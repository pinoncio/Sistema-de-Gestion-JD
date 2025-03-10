const express = require("express");
const router = express.Router();
const {
  getInformeTrabajo,
  getInformeTrabajos,
  newInformeTrabajo,
  updateInformeTrabajo,
  deleteInformeTrabajo,
} = require("../controllers/informecontroller");

// Definir las rutas para órdenes de trabajo
router.get("/list", getInformeTrabajos); // Obtener todas las órdenes de trabajo
router.get("/:id_it", getInformeTrabajo); // Obtener una orden de trabajo por ID
router.post("/", newInformeTrabajo); // Crear una nueva orden de trabajo
router.put("/:id_it", updateInformeTrabajo); // Actualizar una orden de trabajo
router.delete("/:id_it", deleteInformeTrabajo); // Eliminar una orden de trabajo

module.exports = router;
