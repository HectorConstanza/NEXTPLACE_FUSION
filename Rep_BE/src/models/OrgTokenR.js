import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Organizer } from "./Organizer.js";

export const OrgTokenR = sequelize.define("OrgTokenR", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  organizador_id: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  fechaC: { type: DataTypes.DATE, allowNull: false },
  fechaV: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: "orgtokenr",
  timestamps: false
});

// Relación
Organizer.hasMany(OrgTokenR, { foreignKey: "organizador_id" });
OrgTokenR.belongsTo(Organizer, { foreignKey: "organizador_id" });
