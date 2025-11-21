import express from "express";
import { createEvent,getEvents,getFilteredEvents, getEventById} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.post("/filter", getFilteredEvents);
router.get("/:id", getEventById);

export default router;
