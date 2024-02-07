import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  privateNote,
  publicNote,
  shareNote,
  updateNote,
} from "../controllers/note.controller.js";
import checkSchema from "../middlewares/checkSchema.middleware.js";
import {
  CreateNoteSchema,
  ShareNoteSchema,
  UpdateNoteSchema,
} from "../schemas/note.schema.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/create", checkSchema({ schema: CreateNoteSchema }), createNote);
router.put(
  "/update/:id",
  checkSchema({ schema: UpdateNoteSchema }),
  updateNote
);
router.delete("/:id", deleteNote);
router.post("/:id/share", checkSchema({ schema: ShareNoteSchema }), shareNote);
router.post("/:id/publish", publicNote);
router.post("/:id/private", privateNote);

export default router;
