const router = require("express").Router();
const { AuthController } = require("../controllers");

router.post("/registerver", AuthController.registerver);
router.get("/login", AuthController.login);
router.get("/login/:id", AuthController.login);
// ====================================================== Account details ===================
router.put("/edituserdetails/:id", AuthController.editUserDetails);
router.put("/changepassword/:id", AuthController.editPassword);
router.get("/getuserdetais/:id", AuthController.getUserDetails);

module.exports = router;
