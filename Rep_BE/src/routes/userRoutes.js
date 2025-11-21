import express from "express";
import { register, login, logout, profile } from "../controllers/userController.js";
import { validateRegistration, validateLogin,authMiddleware } from "../middlewares/auth.validation.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, profile);

export default router;
