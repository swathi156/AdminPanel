const { RolePermission, Role } = require("../models");

// Create RolePermission
const createRolePermission = async (req, res) => {
  try {
    const { description, componentAccess } = req.body;
    const rp = await RolePermission.create({ description, componentAccess });
    res.json(rp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Role
const createRole = async (req, res) => {
  try {
    const { name, description, moduleAccess, rolePermissionId } = req.body;
    const role = await Role.create({ name, description, moduleAccess, rolePermissionId });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRolePermission, createRole };
