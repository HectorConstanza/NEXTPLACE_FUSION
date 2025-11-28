import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Organizer } from "./Organizer.js";

export const OrgTokenR = sequelize.define("OrgTokenR", {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  organizador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "organizador", 
      key: "id"
    },
    onDelete: "CASCADE"
  },

  token: {
    type: DataTypes.STRING(64), // SHA-256 hash → 64 chars
    allowNull: false,
    unique: true
  },

  fechaC: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  fechaV: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "orgtokenr",
  timestamps: false,

  indexes: [
    { fields: ["organizador_id"] },
    { fields: ["token"] }
  ]
});

// Relaciones
Organizer.hasMany(OrgTokenR, { foreignKey: "organizador_id" });
OrgTokenR.belongsTo(Organizer, { foreignKey: "organizador_id" });
