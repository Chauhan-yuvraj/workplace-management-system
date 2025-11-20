import { Router } from "express";
import express from "express";

import { postVisitor } from "../controllers/Visitor.controller";
import { deleteRecord, getRecords, postRecord } from "../controllers/Record.controller";

const app = express();


const router = Router();
// Example route
router.get("/", getRecords);
router.post("/", postRecord);
router.delete("/:id", deleteRecord);

export default router;