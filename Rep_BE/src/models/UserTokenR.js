import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UserTokenR = sequelize.define("UserTokenR", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING(255), allowNull: false },
  fechaC: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fechaV: { type: DataTypes.DATE }
}, {
  tableName: "usertokenr",
  timestamps: false
});
