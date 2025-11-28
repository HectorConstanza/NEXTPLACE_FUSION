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

import { uploadEventoImg } from "../config/multer.js";
import { getEventAttendees } from "../controllers/eventController.js";

const router = express.Router();

// Crear evento
router.post("/", uploadEventoImg.single("imagen"), createEvent);

// Obtener todos los eventos
router.get("/", getEvents);

// Filtrar eventos
router.post("/filter", getFilteredEvents);

// Obtener categorías (RUTA ESTÁTICA — DEBE IR ANTES DE :id)
router.get("/categories", getCategories);

// Eventos por organizador (DEBE IR ANTES DE :id)
router.get("/organizer/:organizador_id", getEventsByOrganizer);

// Obtener un evento por ID (RUTA DINÁMICA)
router.get("/:id", getEventById);

// Actualizar evento
router.put("/:id", updateEvent);

// Ruta para obtener los asistentes del evento
router.get("/:id/asistentes", getEventAttendees);

export default router;
