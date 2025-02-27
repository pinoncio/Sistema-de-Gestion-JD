const express = require("express");
const router = express.Router();
const {
  newCliente,
  updateCliente,
  getCliente,
  getClientes,
  deleteCliente,
  activarCliente,
} = require("../controllers/clientecontroller");

// Ruta para obtener todos los clientes
router.get("/list", getClientes);

// Ruta para obtener un cliente específico por su id_cliente
router.get("/:id_cliente", getCliente);

// Ruta para crear un nuevo cliente
router.post("/", newCliente);

// Ruta para actualizar un cliente por su id_cliente
router.put("/:id_cliente", updateCliente);

// Ruta para eliminar un cliente por su id_cliente
router.delete("/:id_cliente", deleteCliente);

// Ruta para activar/desactivar un cliente por su id_cliente
router.put("/activar/:id_cliente", activarCliente);

module.exports = router;
