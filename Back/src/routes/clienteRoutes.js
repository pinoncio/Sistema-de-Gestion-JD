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

router.get("/list", getClientes);

router.get("/:id_cliente", getCliente);

router.post("/", newCliente);

router.put("/:id_cliente", updateCliente);

router.delete("/:id_cliente", deleteCliente);

router.put("/activar/:id_cliente", activarCliente);

module.exports = router;
