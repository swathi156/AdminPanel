const { RolePermission } = require("../models");

exports.createRolePermission = async (req, res) => {
  try {
    const { description, componentAccess } = req.body;
    const rolePermission = await RolePermission.create({ description, componentAccess });
    res.status(201).json(rolePermission);
  } catch (error) {
    console.error("Error creating RolePermission:", error);
    res.status(500).json({ error: "Failed to create role permission" });
  }
};

exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.status(200).json(rolePermissions);
  } catch (error) {
    console.error("Error fetching RolePermissions:", error);
    res.status(500).json({ error: "Failed to fetch role permissions" });
  }
};
