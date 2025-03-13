const express = require("express");
const router = express.Router();
const {
  getOts,
  getOt,
  newOt,
  updateOt,
  deleteOt,
  getPdfOt,
} = require("../controllers/otController");

router.get("/list", getOts);
router.get("/:id_ot", getOt);
router.post("/", newOt);
router.put("/:id_ot", updateOt);
router.delete("/:id_ot", deleteOt);
router.get("/pdf/:id_ot", getPdfOt);

module.exports = router;
