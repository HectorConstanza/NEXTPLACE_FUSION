import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { UserTokenR } from "../models/UserTokenR.js";
export const register = async (req, res) => {
  try {
    const { nombre, correoElectronico, contrasena } = req.body;

    const exists = await User.findOne({ where: { correoElectronico } });
    if (exists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const user = await User.create({
      nombre,
      correoElectronico,
      contrasena: hashedPassword,
      role: "attendee"
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(201).json({ message: "Usuario creado", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correoElectronico, contrasena } = req.body;

    const user = await User.findOne({ where: { correoElectronico } });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // 1. Crear token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // 2. Guardar token en BD
    await UserTokenR.create({
      usuario_id: user.id,
      token,
      fechaV: new Date(Date.now() + 3 * 60 * 60 * 1000) // +3 horas
    });

    res.status(200).json({
      message: "Login exitoso",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message
    });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.token;

    await UserTokenR.destroy({
      where: { token }
    });

    res.json({ message: "Sesión cerrada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};


export const profile = async (req, res) => {
  try {
    // req.user viene del authMiddleware (contiene id y role del token)
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "nombre", "correoElectronico", "role"]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};