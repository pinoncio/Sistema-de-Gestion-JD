const express = require("express");
const { getAllProductos, getProductosByOt } = require("../controllers/productocontroller");

const router = express.Router();

// Obtener todos los productos
router.get("/lista", getAllProductos);

// Obtener productos por id_ot
router.get("/:id_ot", getProductosByOt);

module.exports = router;
