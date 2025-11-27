import express from "express";
import {
  createEvent,
  getEvents,
  getFilteredEvents,
  getEventById,
  getEventsByOrganizer,
  updateEvent,
  getCategories
} from "../controllers/eventController.js";

const router = express.Router();

//ORDEN CORRECTO — RUTAS ESPECÍFICAS PRIMERO
router.post("/", createEvent);
router.get("/", getEvents);
router.post("/filter", getFilteredEvents);

router.get("/organizer/:organizador_id", getEventsByOrganizer);

// TU NUEVA RUTA DE CATEGORÍAS — DEBE IR AQUÍ
router.get("/categories", getCategories);

// RUTA DINÁMICA AL FINAL
router.put("/:id", updateEvent);
router.get("/:id", getEventById);

export default router;
