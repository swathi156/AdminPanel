const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RolePermission = sequelize.define("RolePermission", {
  description: { type: DataTypes.STRING, allowNull: false },
  componentAccess: { type: DataTypes.STRING, allowNull: false }
});

module.exports = RolePermission;
