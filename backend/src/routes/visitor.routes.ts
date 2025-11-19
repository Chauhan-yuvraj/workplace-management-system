import { Router } from "express";
import express from "express";

import { postVisitor } from "../controllers/Visitor.controller";

const app = express();


const router = Router();
// Example route
router.get("/", (req, res) => {
    res.send("Visitor routes are working!");
});

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

router.post("/", postVisitor);

export default router;