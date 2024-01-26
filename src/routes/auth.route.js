import express from "express";

import checkSchema from "../middlewares/checkSchema.middleware.js";

import { facebookAuth, googleAuth } from "../controllers/auth.controller.js";
import {
  FacebookAuthSchema,
  GoogleAuthSchema,
} from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/google", checkSchema({ schema: GoogleAuthSchema }), googleAuth);
router.post(
  "/facebook",
  checkSchema({ schema: FacebookAuthSchema }),
  facebookAuth
);

export default router;
