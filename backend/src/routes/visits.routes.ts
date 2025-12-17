import { Router } from "express";
import {
    GetVisits,
    GetVisit,
    ScheduleVisit,
    UpdateVisit,
    DeleteVisit
} from "../controllers/Visit.controller";
import { authorize, protect } from "../middleware/auth.middleware";

const router = Router();

router
    .route("/")
    .get(protect, GetVisits) 
    .post(protect, ScheduleVisit); // Any employee can schedule a visit?

router
    .route("/:id")
    .get(protect, GetVisit)
    .patch(protect, UpdateVisit)
    .delete(protect, authorize('hr', 'admin', 'executive'), DeleteVisit); // Only admins/HR can delete history

export default router;
