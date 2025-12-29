import { Router } from "express";
import {
  getAvailability,
  updateAvailability,
  deleteAvailability
} from "../controllers/availability.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// All availability routes require authentication
router.use(protect);

// Get availability for an employee on a specific date
router.get("/", getAvailability);

// Create or update availability slots
router.post("/", updateAvailability);

// Delete availability slot
router.delete("/:id", deleteAvailability);

export default router;