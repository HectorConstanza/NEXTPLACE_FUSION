import express from "express";
import { createReserva } from "../controllers/reservaController.js";
import { cancelReserva } from "../controllers/reservaController.js";
const router = express.Router();

router.post("/", createReserva);
router.post("/cancel/:id", cancelReserva);
export default router;
