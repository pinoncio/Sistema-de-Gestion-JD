const express = require("express");
const {
  getAllProductos,
  getProductosByOt,
} = require("../controllers/productocontroller");

const router = express.Router();

router.get("/lista", getAllProductos);

router.get("/:id_ot", getProductosByOt);

module.exports = router;
