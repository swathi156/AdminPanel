const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const RolePermission = require("./rolePermission");

const Role = sequelize.define("Role", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  moduleAccess: { type: DataTypes.STRING },
  rolePermissionId: {
    type: DataTypes.INTEGER,
    references: { model: RolePermission, key: "id" }
  }
});

Role.belongsTo(RolePermission, { foreignKey: "rolePermissionId" });
module.exports = Role;
