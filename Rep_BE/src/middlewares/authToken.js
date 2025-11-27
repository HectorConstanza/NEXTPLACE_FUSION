import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    req.user = user; // <-- Guarda el usuario para que authorizeRole pueda usarlo
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
