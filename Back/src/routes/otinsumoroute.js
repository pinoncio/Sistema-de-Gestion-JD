const express = require("express");
const {
  getInsumosByOt,
  getInsumoById,
} = require("../controllers/otinsumocontroller");

const router = express.Router();

// Obtener todos los insumos de una OT
router.get("/:id_ot", getInsumosByOt);

// Obtener un insumo específico de una OT
router.get("/:id_ot/:id_insumo", getInsumoById);

module.exports = router;
