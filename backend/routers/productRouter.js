const express = require("express");
const { productControllers } = require("../controllers");

const router = express.Router();

router.get("/getproduct", productControllers.getProduct);
router.post("/postproduct", productControllers.postProduct);
router.put("/editdata/:id", productControllers.editProduct);

module.exports = router;
