import express from "express";
import { createEvent,getEvents,getFilteredEvents, getEventById} from "../controllers/eventController.js";
import { uploadEventoImg } from "../config/multer.js";

const router = express.Router();

router.post(
  "/",          
  uploadEventoImg.single("imagen"), 
  createEvent
);

router.get("/", getEvents);
router.post("/filter", getFilteredEvents);
router.get("/:id", getEventById);

export default router;
