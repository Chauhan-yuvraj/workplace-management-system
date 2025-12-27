import express from "express";
import { protect, checkPermission } from "../middleware/auth.middleware";
import {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
} from "../controllers/project.controller";

const router = express.Router();

// Public (Authenticated) - Read Projects
router.get("/", protect, getAllProjects);
router.get("/:id", protect, getProject);

// Protected - Manage Projects
router.post("/", protect, checkPermission('manage_projects'), createProject);
router.put("/:id", protect, checkPermission('manage_projects'), updateProject);
router.delete("/:id", protect, checkPermission('manage_projects'), deleteProject);

export default router;
