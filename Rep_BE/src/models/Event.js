import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Event = sequelize.define("Evento", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  categoria: { type: DataTypes.STRING },
  lugar: { type: DataTypes.STRING },
  fecha: { type: DataTypes.DATE, allowNull: false },
  cupos: { type: DataTypes.INTEGER, allowNull: false },
  cuposDispo: { type: DataTypes.INTEGER, allowNull: false },
  organizador_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "evento",
  timestamps: true,
  paranoid: true 
});
