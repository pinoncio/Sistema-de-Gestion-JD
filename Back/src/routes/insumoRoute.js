const express = require("express");
const router = express.Router();
const {
  newInsumo,
  updateInsumo,
  getInsumo,
  getInsumos,
  deleteInsumo,
  activarInsumo,
} = require("../controllers/insumocontroller");

router.get("/list", getInsumos);

router.get("/:id_insumo", getInsumo);

router.post("/", newInsumo);

router.put("/:id_insumo", updateInsumo);

router.delete("/:id_insumo", deleteInsumo);

router.put("/activar/:id_insumo", activarInsumo);

module.exports = router;
