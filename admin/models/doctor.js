const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./role");

const Doctor = sequelize.define("Doctor", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  specialization: { type: DataTypes.STRING },
  hospital: { type: DataTypes.STRING },
  phno: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.INTEGER, references: { model: Role, key: "id" } }
});

Doctor.belongsTo(Role, { foreignKey: "roleId" });
module.exports = Doctor;
