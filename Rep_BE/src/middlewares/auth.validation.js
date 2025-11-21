import { body, validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import { UserTokenR } from "../models/UserTokenR.js";

export const validateRegistration = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('correoElectronico').isEmail().withMessage('El formato del email es inválido.'),
    body('contrasena')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'Error de validación',
                errors: errors.array().map(e => e.msg)
            });
        }
        next();
    }
];

export const validateLogin = [
    body('correoElectronico').isEmail().withMessage('El formato del email es inválido.'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Error de validación',
                errors: errors.array().map(e => e.msg)
            });
        }
        next();
    }
];
export const authMiddleware = async (req, res, next) => {
    
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ message: "Token requerido" });

  const token = auth.split(" ")[1];

  try {
    // 1. verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. verificar que el token exista en BD
    const tokenExists = await UserTokenR.findOne({ where: { token } });

    if (!tokenExists)
      return res.status(401).json({ message: "Token inválido o expirado" });

    // guardar en req para logout
    req.user = decoded;
    req.token = token;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};