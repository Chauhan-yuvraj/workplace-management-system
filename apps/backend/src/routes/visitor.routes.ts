import { Router } from "express";
import {
  GetVisitors,
  PostVisitor,
  GetVisitor,
  DeleteVisitor,
  UpdateVisitor
} from "../controllers/Visitor.controller";
import { checkPermission, protect } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router();

router
  .route("/")
  .get(protect, checkPermission('manage_visitors'), GetVisitors)
  .post(protect, checkPermission('manage_visitors'), upload.single('profileImg'), PostVisitor);

router
  .route("/:id")
  .get(protect, checkPermission('manage_visitors'), GetVisitor)
  .patch(protect, checkPermission('manage_visitors'), upload.single('profileImg'), UpdateVisitor)
  .delete(protect, checkPermission('manage_visitors'), DeleteVisitor);

export default router;
