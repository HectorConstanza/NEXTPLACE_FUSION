import jwt from "jsonwebtoken";
import { OrgTokenR } from "../models/OrgTokenR.js";

export const authOrganizer = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Token requerido" });

    const token = header.split(" ")[1];
    req.token = token;

    const exists = await OrgTokenR.findOne({ where: { token } });
    if (!exists)
      return res.status(401).json({ message: "Token inválido o expirado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.organizer = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Token inválido", error: error.message });
  }
};
