import tryCatch from "../helper/tryCatch.js";
import {
  _createNoteList,
  _deleteTask,
  _taskComplete,
  _taskFail,
  _updateNoteList,
} from "../services/noteList.service.js";

export const createNoteList = tryCatch(async (req, res) => {
  const note = await _createNoteList(req);

  return res.success(note);
});

export const updateNoteList = tryCatch(async (req, res) => {
  const note = await _updateNoteList(req);

  return res.success(note);
});

export const taskComplete = tryCatch(async (req, res) => {
  const note = await _taskComplete(req);

  return res.success(note);
});

export const taskFail = tryCatch(async (req, res) => {
  const note = await _taskFail(req);

  return res.success(note);
});

export const deleteTask = tryCatch(async (req, res) => {
  const note = await _deleteTask(req);

  return res.success(note);
});
