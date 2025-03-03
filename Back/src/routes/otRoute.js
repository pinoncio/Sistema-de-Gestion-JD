const express = require("express");
const router = express.Router();
const {
  getOts,
  getOt,
  newOt,
  updateOt,
  deleteOt,
  getPdfOt,
} = require("../controllers/otcontroller");

// Definir las rutas para órdenes de trabajo
router.get("/list", getOts); // Obtener todas las órdenes de trabajo
router.get("/:id_ot", getOt); // Obtener una orden de trabajo por ID
router.post("/", newOt); // Crear una nueva orden de trabajo
router.put("/:id_ot",  updateOt); // Actualizar una orden de trabajo
router.delete("/:id_ot", deleteOt); // Eliminar una orden de trabajo
router.get("/pdf/:id_ot", getPdfOt);


module.exports = router;
