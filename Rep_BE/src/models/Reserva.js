import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Reserva = sequelize.define("Reserva", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  evento_id: { type: DataTypes.INTEGER, allowNull: false },
  fechaReserva: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.STRING, defaultValue: "confirmada" },
  cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },

}, {
  tableName: "reserva",
  timestamps: false
});
