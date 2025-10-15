const router = require("express").Router();
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/permissions", roleController.createRolePermission);
router.post("/", roleController.createRole);

module.exports = router;
