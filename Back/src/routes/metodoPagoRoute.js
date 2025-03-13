const express = require("express");
const {
  getAllMetodoPago,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
  getMetodoPagoById,
} = require("../controllers/metodopagocontroller");
const router = express.Router();

router.get("/list", getAllMetodoPago);
router.get("/:id_metodo_pago", getMetodoPagoById);
router.post("/", createMetodoPago);
router.put("/:id_metodo_pago", updateMetodoPago);
router.delete("/:id_metodo_pago", deleteMetodoPago);

module.exports = router;
