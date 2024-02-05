import express from "express";

import checkSchema from "../middlewares/checkSchema.middleware.js";
import {
  CreateThemeSchema,
  UpdateThemeSchema,
} from "../schemas/theme.schema.js";
import {
  createTheme,
  deleteTheme,
  getThemes,
  updateTheme,
} from "../controllers/theme.controller.js";

const router = express.Router();

router.get("/", getThemes);
router.post("/create", checkSchema({ schema: CreateThemeSchema }), createTheme);
router.put(
  "/update/:id",
  checkSchema({ schema: UpdateThemeSchema }),
  updateTheme
);
router.delete("/:id", deleteTheme);

export default router;
