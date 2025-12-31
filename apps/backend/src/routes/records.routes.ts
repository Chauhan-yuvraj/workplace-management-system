import { Router } from "express";
import { deleteRecord, getRecords, postRecord } from "../controllers/Record.controller";
import { upload } from "../middleware/multer.middleware";
import { checkPermission, protect } from "../middleware/auth.middleware";

const router = Router();
// Example route
router.get("/", protect, checkPermission('manage_records'), getRecords);
router.post("/", protect, checkPermission('manage_records'), upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'images', maxCount: 5 }]), postRecord);
router.delete("/:id", protect, checkPermission('manage_records'), deleteRecord);

export default router;