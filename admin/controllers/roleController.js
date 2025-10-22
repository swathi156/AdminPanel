const { RolePermission, Role } = require("../models");

// Create Role + RolePermission together
const createRole = async (req, res) => {
  try {
    const { name, description, moduleAccess, componentAccess } = req.body;

    // 1️Create RolePermission first
    const rolePermission = await RolePermission.create({
      description,
      componentAccess
    });

    // Then create Role and link it
    const role = await Role.create({
      name,
      description,
      moduleAccess,
      rolePermissionId: rolePermission.id
    });

    // Return response
    res.status(201).json({
      message: "Role and RolePermission created successfully",
      role
    });
  } catch (err) {
    console.error("Error creating role:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRole };
