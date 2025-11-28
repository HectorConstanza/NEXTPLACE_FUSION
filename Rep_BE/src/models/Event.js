import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },

  lugar: {
    type: DataTypes.STRING,
    allowNull: true
  },

  imagen: {
    type: DataTypes.STRING,   
    allowNull: true
  },

  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },

  cupos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  cuposDispo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  organizador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  costo: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "evento",        
  timestamps: true,
  paranoid: true
});
