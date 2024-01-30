import express from "express";

import checkSchema from "../middlewares/checkSchema.middleware.js";

import {
  facebookAuth,
  googleAuth,
  refreshToken,
} from "../controllers/auth.controller.js";
import {
  FacebookAuthSchema,
  GoogleAuthSchema,
  RefreshTokenSchema,
} from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/google", checkSchema({ schema: GoogleAuthSchema }), googleAuth);
router.post(
  "/facebook",
  checkSchema({ schema: FacebookAuthSchema }),
  facebookAuth
);
router.post("/refresh-token", checkSchema({ schema: RefreshTokenSchema }), refreshToken);

export default router;
