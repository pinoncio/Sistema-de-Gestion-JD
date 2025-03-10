const express = require("express");
const {
  getAllTiempo,
  getTiempoByIt,
} = require("../controllers/controltiempocontroller");

const router = express.Router();

router.get("/lista", getAllTiempo);

router.get("/:id_it", getTiempoByIt);

module.exports = router;
