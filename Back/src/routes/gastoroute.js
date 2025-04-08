const express = require("express");
const router = express.Router();
const GastoController = require("../controllers/gastocontroller");

router.post("/", GastoController.newGasto);
router.get("/list", GastoController.getGastos);
router.get("/:id_gasto", GastoController.getGasto);
router.put("/:id_gasto", GastoController.updateGasto);
router.delete("/:id_gasto", GastoController.deleteGasto);
router.get("/gasto/mensuales", GastoController.getGastosMensuales); 

module.exports = router;
