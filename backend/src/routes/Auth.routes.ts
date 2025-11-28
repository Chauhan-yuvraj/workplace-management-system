import { Router } from "express";
import { Login, RefreshAccessToken } from "../controllers/Auth.controller";

const router = Router();

router.post('/login', Login)

router.post("/refresh", RefreshAccessToken);



export default router;