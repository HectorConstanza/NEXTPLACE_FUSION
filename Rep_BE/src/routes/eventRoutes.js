import express from "express";
import { createEvent,getEvents,getFilteredEvents, getEventById, getEventsByOrganizer, updateEvent}from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.post("/filter", getFilteredEvents);
// Las rutas específicas van ANTES que las dinámicas
router.get("/organizer/:organizador_id", getEventsByOrganizer);

//agregué estas rutas - Deras
router.put("/:id", updateEvent); // ← AQUI
router.get("/:id", getEventById);




export default router;
