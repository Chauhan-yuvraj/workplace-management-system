import { Router } from "express";
import {
    GetVisits,
    GetVisit,
    ScheduleVisit,
    UpdateVisit,
    DeleteVisit
} from "../controllers/Visit.controller";
import { checkPermission, protect } from "../middleware/auth.middleware";

const router = Router();

router
    .route("/")
    .get(protect, checkPermission('manage_visits', 'view_self_visits'), GetVisits) 
    .post(protect, checkPermission('manage_visits', 'view_self_visits'), ScheduleVisit); // Any employee can schedule a visit?

router
    .route("/:id")
    .get(protect, checkPermission('manage_visits', 'view_self_visits'), GetVisit)
    .patch(protect, checkPermission('manage_visits', 'view_self_visits'), UpdateVisit)
    .delete(protect, checkPermission('manage_visits'), DeleteVisit); // Only admins/HR can delete history

export default router;
