import express from "express";
import { createEvent,getEvents,getFilteredEvents, getEventById, getEventsByOrganizer } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.post("/filter", getFilteredEvents);
// Las rutas específicas van ANTES que las dinámicas
router.get("/organizer/:organizador_id", getEventsByOrganizer);
router.get("/:id", getEventById);

export default router;
