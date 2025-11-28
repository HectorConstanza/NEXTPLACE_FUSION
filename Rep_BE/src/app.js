import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";              // ← añadido
const __dirname = path.resolve();     // ← añadido

import { sequelize } from "./config/db.js";

import "./models/index.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import organizerRoutes from "./routes/organizerRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/reservas", reservaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Error interno del servidor.";

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors.map(e => e.message);
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token inválido o expirado.";
  }

  res.status(statusCode).json({
    status: "error",
    message
  });
});

sequelize.sync()
  .then(() => console.log("DB conectada"))
  .catch((err) => console.error("Error al conectar DB:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
