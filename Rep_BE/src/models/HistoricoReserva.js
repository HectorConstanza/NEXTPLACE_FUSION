import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const HistoricoReserva = sequelize.define("HistoricoReserva", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  reserva_id: { type: DataTypes.INTEGER, allowNull: false },
  fechaCambio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estadoAnterior: { type: DataTypes.STRING },
  estadoNuevo: { type: DataTypes.STRING }
}, {
  tableName: "historicoReserva",
  timestamps: false
});
