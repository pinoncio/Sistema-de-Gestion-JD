"use strict";
const { Router } = require("express");
const {
  getCategorias,
  newCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
} = require("../controllers/categoriacontroller");
const router = Router();

router.post("/", newCategoria);
router.put("/:id_categoria", updateCategoria);
router.delete("/:id_categoria", deleteCategoria);
router.get("/list", getCategorias);
router.get("/:id_categoria", getCategoria);

module.exports = router;
