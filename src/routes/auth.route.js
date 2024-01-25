import express from "express";

import checkSchema from "../middlewares/checkSchema.middleware.js";

import { facebookAuth, googleAuth } from "../controllers/auth.controller.js";
import { GoogleAuthSchema } from "../schemas/profile.schema.js";

const router = express.Router();

router.post("/google", checkSchema({ schema: GoogleAuthSchema }), googleAuth);

export default router;
