import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";
import checkSchema from "../middlewares/checkSchema.middleware.js";
import { CreateNoteSchema, UpdateNoteSchema } from "../schemas/note.schema.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/create", checkSchema({ schema: CreateNoteSchema }), createNote);
router.put(
  "/update/:id",
  checkSchema({ schema: UpdateNoteSchema }),
  updateNote
);
router.delete("/:id", deleteNote);

export default router;
