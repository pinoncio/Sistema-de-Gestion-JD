// routes/metodoPagoRoutes.js
const express = require("express");
const {
  getAllMetodoPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
} = require("../controllers/metodoPagoController");
const router = express.Router();

router.get("/list", getAllMetodoPago);
router.post("/", createMetodoPago);
router.put("/:ID_METODO_PAGO", updateMetodoPago); 
router.delete("/:ID_METODO_PAGO", deleteMetodoPago); 

module.exports = router;
