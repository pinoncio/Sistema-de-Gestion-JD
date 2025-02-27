// routes/metodoPagoRoutes.js
const express = require("express");
const {
  getAllMetodoPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
  getMetodoPagoById,  // Asegúrate de importar la nueva función
} = require("../controllers/metodopagocontroller");
const router = express.Router();

router.get("/list", getAllMetodoPago);  // Obtener todos los métodos de pago
router.get("/:id_metodo_pago", getMetodoPagoById);  // Obtener un método de pago por ID
router.post("/", createMetodoPago);  // Crear un nuevo método de pago
router.put("/:id_metodo_pago", updateMetodoPago);  // Actualizar un método de pago
router.delete("/:id_metodo_pago", deleteMetodoPago);  // Eliminar un método de pago

module.exports = router;
