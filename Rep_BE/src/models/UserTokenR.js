import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UserTokenR = sequelize.define("UserTokenR", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING(255), allowNull: false },

  // Fecha de creación del token
  fechaC: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  // Fecha de expiración (1 hora después)
  fechaV: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: "usertokenr",
  timestamps: false,
});
