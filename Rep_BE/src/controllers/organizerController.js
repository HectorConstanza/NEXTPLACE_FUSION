import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Organizer } from "../models/Organizer.js";
import { OrgTokenR } from "../models/OrgTokenR.js";

export const registerOrganizer = async (req, res) => {
  try {
    const { nombre, correoElectronico, contrasena } = req.body;

    const hashed = await bcrypt.hash(contrasena, 10);

    const organizer = await Organizer.create({
      nombre,
      correoElectronico,
      contraseña: hashed
    });

    // Enviamos también el role
    const organizerData = {
      id: organizer.id,
      nombre: organizer.nombre,
      correoElectronico: organizer.correoElectronico,
      role: "organizer"
    };

    // Generar token
    const token = jwt.sign(organizerData, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(201).json({
      message: "Organizador registrado",
      token,
      organizer: organizerData
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar organizador",
      error: error.message,
    });
  }
};


export const loginOrganizer = async (req, res) => {
  try {
    const { correoElectronico, contrasena } = req.body;

    const organizer = await Organizer.findOne({ where: { correoElectronico } });
    if (!organizer)
      return res.status(400).json({ message: "Organizador no encontrado" });

    const match = await bcrypt.compare(contrasena, organizer.contraseña);
    if (!match)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const organizerData = {
      id: organizer.id,
      nombre: organizer.nombre,
      correoElectronico: organizer.correoElectronico,
      role: "organizer"
    };

    const token = jwt.sign(organizerData, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    const now = new Date();
    const exp = new Date(now.getTime() + 60 * 60 * 1000);

    await OrgTokenR.create({
      organizador_id: organizer.id,
      token,
      fechaC: now,
      fechaV: exp
    });

    res.status(200).json({
      message: "Login exitoso",
      token,
      organizer: organizerData
    });

  } catch (error) {
    res.status(500).json({ message: "Error en login", error: error.message });
  }
};


export const logoutOrganizer = async (req, res) => {
  try {
    const token = req.token;
    await OrgTokenR.destroy({ where: { token } });

    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al cerrar sesión", error: error.message });
  }
};
