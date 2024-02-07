import tryCatch from "../helper/tryCatch.js";
import {
  _createNote,
  _deleteNote,
  _getNote,
  _getNotes,
  _privateNote,
  _publicNote,
  _shareNote,
  _updateNote,
} from "../services/note.service.js";

export const getNotes = tryCatch(async (req, res) => {
  const [count, data] = await _getNotes(req);

  return res.success(data, 200, {
    meta: {
      count,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20,
    },
  });
});

export const getNote = tryCatch(async (req, res) => {
  const note = await _getNote(req);

  return res.success(note);
});

export const createNote = tryCatch(async (req, res) => {
  const note = await _createNote(req);

  return res.success(note);
});

export const updateNote = tryCatch(async (req, res) => {
  const note = await _updateNote(req);

  return res.success(note);
});

export const deleteNote = tryCatch(async (req, res) => {
  await _deleteNote(req);

  return res.success({ message: "successfully deleted" });
});

export const publicNote = tryCatch(async (req, res) => {
  await _publicNote(req.params.id);

  return res.success({ message: "successfully published" });
});

export const privateNote = tryCatch(async (req, res) => {
  await _privateNote(req.params.id);

  return res.success({ message: "successfully privated" });
});

export const shareNote = tryCatch(async (req, res) => {
  const note = await _shareNote(req);

  return res.success(note);
});
