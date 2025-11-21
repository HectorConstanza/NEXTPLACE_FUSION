import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correoElectronico: { type: DataTypes.STRING, unique: true, allowNull: false },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("organizer", "attendee"), allowNull: false, defaultValue: "attendee" }
}, {
  tableName: "usuario",
  timestamps: false
});
