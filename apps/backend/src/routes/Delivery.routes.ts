import express from "express";
import {
  createDelivery,
  getDeliveries,
  updateDeliveryStatus,
  deleteDelivery,
} from "../controllers/Delivery.controller";
import { checkPermission, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, checkPermission('create_deliveries'), createDelivery);
router.get("/", protect, checkPermission('view_all_deliveries'), getDeliveries);
router.patch("/:id/status", protect, checkPermission('view_all_deliveries'), updateDeliveryStatus);
router.delete("/:id", protect, checkPermission('view_all_deliveries'), deleteDelivery);

export default router;
