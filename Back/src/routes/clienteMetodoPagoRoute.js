const express = require("express");
const router = express.Router();
const {
  agregarMetodoPagoCliente,
  obtenerMetodosPagoCliente,
  obtenerMetodoPagoClienteporId,
  actualizarMetodoPagoCliente,
  eliminarMetodoPagoCliente,
} = require("../controllers/clientemetodopagocontroller");

// Ruta para obtener todos los métodos de pago de un cliente
router.get("/:id_cliente", obtenerMetodosPagoCliente);

// Ruta para obtener un método de pago específico de un cliente por su id_metodo_pago
router.get(
  "/:id_cliente/:id_metodo_pago",
  obtenerMetodoPagoClienteporId
);

// Ruta para agregar un nuevo método de pago a un cliente
router.post("/", agregarMetodoPagoCliente);

// Ruta para actualizar un método de pago de un cliente
router.put("/:id_cliente/:id_metodo_pago", actualizarMetodoPagoCliente);

// Ruta para eliminar un método de pago de un cliente
router.delete("/:id_cliente/:id_metodo_pago", eliminarMetodoPagoCliente);

module.exports = router;
