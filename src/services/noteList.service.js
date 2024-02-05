import mongoose from "mongoose";
import { NotFoundError } from "../helper/customErrors.js";
import NoteModel from "../models/note.model.js";

export const _createNoteList = async (req) => {
  const { noteId } = req.params;

  const note = await NoteModel.findOne({ _id: noteId });

  if (!note) throw new NotFoundError();

  const list = note.list;

  list.push({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    priority: req.body.priority || 1,
    is_complete: false,
    is_fail: false,
  });

  note.list = list;

  await note.save();

  return note;
};

export const _updateNoteList = async (req) => {
  const { noteId, noteListId } = req.params;

  const note = await NoteModel.findOne({ _id: noteId });

  if (!note) throw new NotFoundError();

  const newList = note.list.map((list) => {
    if (list._id === noteListId) {
      list.text = req.body.text;
      list.priority = req.body.priority;
    }

    return list;
  });

  note.list = newList;

  await note.save();

  return note;
};

export const _taskComplete = async (req) => {
  const { noteId, noteListId } = req.params;

  const note = await NoteModel.findOne({ _id: noteId });

  if (!note) throw new NotFoundError();

  const newList = note.list.map((list) => {
    if (list._id === noteListId && !list.is_fail) {
      list.is_complete = true;
    }

    return list;
  });

  note.list = newList;

  await note.save();

  return note;
};

export const _taskFail = async (req) => {
  const { noteId, noteListId } = req.params;

  const note = await NoteModel.findOne({ _id: noteId });

  if (!note) throw new NotFoundError();

  const newList = note.list.map((list) => {
    if (list._id === noteListId && !list.is_complete) {
      list.is_fail = true;
    }

    return list;
  });

  note.list = newList;

  await note.save();

  return note;
};

export const _deleteTask = async (req) => {
  const { noteId, noteListId } = req.params;

  const note = await NoteModel.findOne({ _id: noteId });

  if (!note) throw new NotFoundError();

  const newList = note.list.filter((list) => list._id !== noteListId);

  note.list = newList;

  await note.save();

  return note;
};
