const express = require("express");
const router = express.Router();
const { createRolePermission, getAllRolePermissions } = require("../controllers/rolePermissionController");

// POST - Create a new role permission
router.post("/", createRolePermission);

// GET - Get all role permissions
router.get("/", getAllRolePermissions);

module.exports = router; // 
