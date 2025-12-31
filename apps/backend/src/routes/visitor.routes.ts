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
  .get(protect, checkPermission('view_all_visitors', 'view_department_visitors'), GetVisitors)
  .post(protect, checkPermission('create_visitors'), upload.single('profileImg'), PostVisitor);

router
  .route("/:id")
  .get(protect, checkPermission('view_all_visitors', 'view_department_visitors'), GetVisitor)
  .patch(protect, checkPermission('view_all_visitors', 'view_department_visitors', 'create_visitors'), upload.single('profileImg'), UpdateVisitor)
  .delete(protect, checkPermission('view_all_visitors', 'view_department_visitors', 'create_visitors'), DeleteVisitor);

export default router;
