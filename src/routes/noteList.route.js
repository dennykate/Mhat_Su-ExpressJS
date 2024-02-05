import express from "express";

import {
  createNoteList,
  deleteTask,
  taskComplete,
  taskFail,
  updateNoteList,
} from "../controllers/noteList.controller.js";
import {
  CreateNoteListSchema,
  UpdateNoteListSchema,
} from "../schemas/noteList.schema.js";
import checkSchema from "../middlewares/checkSchema.middleware.js";

const router = express.Router();

router.post(
  "/:noteId",
  checkSchema({ schema: CreateNoteListSchema }),
  createNoteList
);
router.put(
  "/:noteId/list/:noteListId",
  checkSchema({ schema: UpdateNoteListSchema }),
  updateNoteList
);
router.post("/:noteId/list/:noteListId/complete", taskComplete);
router.post("/:noteId/list/:noteListId/fail", taskFail);
router.delete("/:noteId/list/:noteListId", deleteTask);

export default router;
