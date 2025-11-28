import express from "express";
import { createReserva } from "../controllers/reservaController.js";
import { cancelReserva } from "../controllers/reservaController.js";
import { verifyToken } from "../middlewares/authToken.js";
import { getMisReservas } from "../controllers/reservaController.js";
const router = express.Router();

router.post("/", createReserva);
router.post("/cancel/:id", cancelReserva);
router.get("/mias", verifyToken, getMisReservas);
export default router;
