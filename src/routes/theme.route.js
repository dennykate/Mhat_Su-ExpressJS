import express from "express";

import checkSchema from "../middlewares/checkSchema.middleware.js";
import { UpdateThemeSchema } from "../schemas/theme.schema.js";
import {
  deleteTheme,
  getThemes,
  setDefault,
  updateTheme,
} from "../controllers/theme.controller.js";

const router = express.Router();

router.get("/", getThemes);
router.put("/update", checkSchema({ schema: UpdateThemeSchema }), updateTheme);
// router.delete("/:id", deleteTheme);
router.post("/set-default", setDefault);

export default router;
