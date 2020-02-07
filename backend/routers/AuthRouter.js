const router = require("express").Router();
const { AuthController } = require("../controllers");


router.post("/registerver", AuthController.registerver);
router.get('/login',AuthController.login)
router.get('/login/:id',AuthController.login)


module.exports = router;
