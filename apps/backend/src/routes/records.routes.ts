import { Router } from "express";
import { deleteRecord, getRecords, postRecord } from "../controllers/Record.controller";
import { upload } from "../middleware/multer.middleware";
import { checkPermission, protect } from "../middleware/auth.middleware";

const router = Router();
// Example route
router.get("/", protect, checkPermission('view_reports', 'manage_reports'), getRecords);
router.post("/", protect, checkPermission('manage_reports', 'view_reports'), upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'images', maxCount: 5 }]), postRecord);
router.delete("/:id", protect, checkPermission('manage_reports', 'view_reports'), deleteRecord);

export default router;