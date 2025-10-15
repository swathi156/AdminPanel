const RolePermission = require("./rolePermission");
const Role = require("./role");
const User = require("./User");
const Doctor = require("./doctor");

Role.belongsTo(RolePermission, { foreignKey: "rolePermissionId" });
Doctor.belongsTo(Role, { foreignKey: "roleId" });

module.exports = { RolePermission, Role, User, Doctor };
