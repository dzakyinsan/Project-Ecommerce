const express = require("express");
const { productControllers } = require("../controllers");

const router = express.Router();

router.get("/gethotitems", productControllers.getHotItems);
router.get("/getproduct", productControllers.getProduct);
router.post("/postproduct", productControllers.postProduct);
router.put("/editdata/:id", productControllers.editProduct);
router.delete("/deletedata/:productid", productControllers.deleteProduct);

// ====================================== view details =========================
router.get("/getDetail/:id", productControllers.getDetail);
router.post("/posttransaction", productControllers.postTransaction);

// ========================================== cart ==============================
router.get("/getCart/:id", productControllers.getCart);
router.delete("/deletecart/:id/:idUser", productControllers.deleteCart);
router.put("/checkoutcart/:id", productControllers.editCheckbox);

// ============================================ checkout ========================
router.get("/getCheckout/:id", productControllers.getCheckout);
router.post("/postCheckout/:id", productControllers.postCheckout);
router.put("/waitingpayment/:id", productControllers.editWaitingpayment);

module.exports = router;
