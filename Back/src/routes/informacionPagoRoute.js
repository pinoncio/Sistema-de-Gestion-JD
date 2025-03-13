const express = require("express");
const router = express.Router();
const {
  newInformacionDePago,
  updateInformacionDePago,
  getInformacionDePago,
  getInformacionesDePago,
  deleteInformacionDePago,
} = require("../controllers/informacionpagocontroller");

router.get("/list", getInformacionesDePago);

router.get("/:id_cliente", getInformacionDePago);

router.post("/", newInformacionDePago);

router.put("/:id_cliente", updateInformacionDePago);

router.delete("/:id_informacion", deleteInformacionDePago);

module.exports = router;
