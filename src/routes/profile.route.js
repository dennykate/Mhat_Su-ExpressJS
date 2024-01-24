import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { me } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, me);

export default router;
