import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Organizer = sequelize.define("Organizador", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correoElectronico: { type: DataTypes.STRING, unique: true, allowNull: false },
  contraseña: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "organizador",
  timestamps: false
});
