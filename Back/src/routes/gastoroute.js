const express = require("express");
const router = express.Router();
const GastoController = require("../controllers/gastocontroller"); // Cambié 'CostoController' por 'GastoController'

// Rutas CRUD para Gastos
router.post("/", GastoController.newGasto); // Cambié 'newCosto' por 'newGasto'
router.get("/list", GastoController.getGastos); // Cambié 'getCostos' por 'getGastos'
router.get("/:id_gasto", GastoController.getGasto); // Cambié 'getCosto' por 'getGasto'
router.put("/:id_gasto", GastoController.updateGasto); // Cambié 'updateCosto' por 'updateGasto'
router.delete("/:id_gasto", GastoController.deleteGasto); // Cambié 'deleteCosto' por 'deleteGasto'

module.exports = router;
