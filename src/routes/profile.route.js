import express from "express";
import { me, update } from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", me);
router.put("/update", update);

export default router;
