const express = require("express");
const router = express.Router();
const {
  agregarMetodoPagoCliente,
  obtenerMetodosPagoCliente,
  obtenerMetodoPagoClienteporId,
  actualizarMetodoPagoCliente,
  eliminarMetodoPagoCliente,
} = require("../controllers/clientemetodopagocontroller");

router.get("/:id_cliente", obtenerMetodosPagoCliente);

router.get("/:id_cliente/:id_metodo_pago", obtenerMetodoPagoClienteporId);

router.post("/", agregarMetodoPagoCliente);

router.put("/:id_cliente/:id_metodo_pago", actualizarMetodoPagoCliente);

router.delete("/:id_cliente/:id_metodo_pago", eliminarMetodoPagoCliente);

module.exports = router;
