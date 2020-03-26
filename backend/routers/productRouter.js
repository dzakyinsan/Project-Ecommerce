const express = require("express");
const { productControllers } = require("../controllers");

const router = express.Router();

router.get("/gethotitems", productControllers.getHotItems);
router.get("/getproduct", productControllers.getProduct);
router.get("/getproductFootball/:page", productControllers.getProductFootball);
router.get("/getproductBasketball/:page", productControllers.getProductBasketball);
router.get("/getproductRunning/:page", productControllers.getProductRunning);
router.post("/postproduct", productControllers.postProduct);
router.put("/editdata/:id", productControllers.editProduct);
router.delete("/deletedata/:productid", productControllers.deleteProduct);

// ====================================== view details =========================
router.get("/getDetail/:id", productControllers.getDetail);
router.post("/posttransaction", productControllers.postTransaction);

// ========================================== cart ==============================
router.get("/getCart/:id", productControllers.getCart);
router.delete("/deletecart/:id/:idUser", productControllers.deleteCart);
router.put("/checkoutcart/:id", productControllers.editCheckout);

// ============================================ checkout ========================
router.get("/getCheckout/:id", productControllers.getCheckout);
router.post("/postCheckout/:id", productControllers.postCheckout);
router.put("/waitingpayment/:id", productControllers.editWaitingpayment);

// ============================================== payment Request Admin ===========
router.get("/getpaymentrequest", productControllers.getPaymentRequest);
router.get("/geteachdata", productControllers.getEachDataPayment);
router.put("/approvepayment/:id", productControllers.ApprovePayment);
router.put("/rejectpayment/:id", productControllers.RejectPayment);

// ================================================ order complete =================
router.get("/getordercomplete/:id", productControllers.getOrderComplete);
module.exports = router;
