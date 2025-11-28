import express from "express";
import { register, login, logout, profile } from "../controllers/userController.js";
import { validateRegistration, validateLogin,authMiddleware } from "../middlewares/auth.validation.js";
import { verifyToken } from "../middlewares/authToken.js";
import { User } from "../models/User.js";
const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, profile);

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "nombre", "correoElectronico", "role"]
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// Actualizar nombre del usuario
router.put("/update", verifyToken, async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    await User.update(
      { nombre },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Perfil actualizado" });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al actualizar", 
      error: error.message 
    });
  }
});
export default router;
