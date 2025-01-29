const express = require("express");
const router = express.Router();
const {
  newInformacionDePago,
  updateInformacionDePago,
  getInformacionDePago,
  getInformacionesDePago,
  deleteInformacionDePago,
} = require("../controllers/informacionPagoController");

// Ruta para obtener todas las informaciones de pago
router.get("/list", getInformacionesDePago);

// Ruta para obtener una información de pago específica por el id_cliente
router.get("/:id_cliente", getInformacionDePago);

// Ruta para crear una nueva información de pago
router.post("/", newInformacionDePago);

// Ruta para actualizar una información de pago por el id_cliente
router.put("/:id_informacion", updateInformacionDePago);

// Ruta para eliminar una información de pago por el id_cliente
router.delete("/:id_informacion", deleteInformacionDePago);

module.exports = router;
