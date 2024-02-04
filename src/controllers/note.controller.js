import tryCatch from "../helper/tryCatch.js";
import {
  _createNote,
  _deleteNote,
  _getNotes,
  _updateNote,
} from "../services/note.service.js";

export const getNotes = tryCatch(async (req, res) => {
  const notes = await _getNotes(req);
  return res.success(notes);
});

export const createNote = tryCatch(async (req, res) => {
  const response = await _createNote(req);
  return res.success(response);
});

export const updateNote = tryCatch(async (req, res) => {
  const response = await _updateNote(req);
  return res.success(response);
});

export const deleteNote = tryCatch(async (req, res) => {
  await _deleteNote(req);
  return res.success({ message: "successfully deleted" });
});
