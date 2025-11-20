import { Router } from "express";
import express from "express";

import { postVisitor } from "../controllers/Visitor.controller";

const app = express();


const router = Router();
// Example route
// router.get("/", getVisitor);

router.post("/", postVisitor);

export default router;