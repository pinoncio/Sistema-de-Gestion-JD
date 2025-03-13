const express = require("express");
const {
  getInsumosByOt,
  getInsumoById,
} = require("../controllers/otinsumocontroller");

const router = express.Router();

router.get("/:id_ot", getInsumosByOt);

router.get("/:id_ot/:id_insumo", getInsumoById);

module.exports = router;
