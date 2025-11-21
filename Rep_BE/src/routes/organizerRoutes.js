import express from "express";
import { registerOrganizer, loginOrganizer, logoutOrganizer } from "../controllers/organizerController.js";
import { validateLogin, validateRegistration } from "../middlewares/auth.validation.js";
import { authOrganizer } from "../middlewares/authOrganizer.js";

const router = express.Router();

router.post("/register", validateRegistration, registerOrganizer);
router.post("/login", validateLogin, loginOrganizer);
router.post("/logout", authOrganizer, logoutOrganizer);

export default router;
