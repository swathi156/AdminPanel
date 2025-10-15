const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser); // role: superadmin/doctor/patient
router.post("/login", authController.login);

module.exports = router;
