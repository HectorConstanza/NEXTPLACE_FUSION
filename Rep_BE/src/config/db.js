import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// Conexión a la base de datos usando Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME || "NextPlace_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: console.log,
    define: {
      timestamps: false,      // createdAt / updatedAt
      paranoid: true,        // deletedAt
      underscored: false      // snake_case
    }
  }
);
//Funcion para probar la conexión
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB conectada correctamente");
  } catch (error) {
    console.error("Error al conectar DB:", error);
  }
};
