import express from "express";
import { me } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", me);

export default router;
