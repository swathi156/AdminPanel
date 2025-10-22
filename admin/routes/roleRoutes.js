const express = require("express");
const { createRole } = require("../controllers/roleController");
const router = express.Router();

// Single API to create Role + RolePermission
router.post("/roles", createRole);

module.exports = router;
