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
    .get(protect, checkPermission('view_all_visits', 'view_department_visits'), GetVisits)
    .post(protect, checkPermission('create_visits'), ScheduleVisit);

router
    .route("/:id")
    .get(protect, checkPermission('view_all_visits', 'view_department_visits'), GetVisit)
    .patch(protect, checkPermission('view_all_visits', 'view_department_visits', 'create_visits'), UpdateVisit)
    .delete(protect, checkPermission('view_all_visits'), DeleteVisit);

export default router;
