import { BadRequestError, NotFoundError } from "../helper/customErrors.js";
import { ModelProvider } from "./modelProvider.service.js";
import NoteModel from "../models/note.model.js";
import AuthModel from "../models/auth.model.js";

export const _getNotes = async (req) => {
  const Model = new ModelProvider(NoteModel, req);

  const [count, data] = await Model.searchWith(["title", "theme"]).get();

  return [count, data];
};

export const _getNote = async (req) => {
  const { id } = req.params;

  const note = await NoteModel.findById(id);

  if (!note) throw new NotFoundError("Invalid note id");

  if (note.auth == req.user._id) return note;

  if (note.status === "private")
    throw new BadRequestError("This note is private");

  const isExist = note.users.find((user) => user == req.user._id);

  if (!isExist)
    throw new BadRequestError("You havn't access to view this note");

  return note;
};

export const _createNote = async (req) => {
  const { title, theme } = req.body;
  const auth = req.user._id;
  const note = await NoteModel.create({
    auth,
    title,
    theme,
    status: "private",
  });
  return note;
};

export const _updateNote = async (req) => {
  const { id } = req.params;
  const title = req.body.title;
  const theme = req.body.theme;

  const note = await NoteModel.findOne({ _id: id });

  if (!note) throw new NotFoundError();

  note.title = title ?? note.title;
  note.theme = theme ?? note.theme;

  await note.save();

  return note;
};

export const _deleteNote = async (req) => {
  const { id } = req.params;

  const note = await NoteModel.findOne({ _id: id });

  if (!note) throw new NotFoundError();

  await note.deleteOne({ _id: id });
};

export const _publicNote = async (id) => {
  const note = await NoteModel.findOne({ _id: id });

  if (!note) throw new NotFoundError("Invalid note id");

  note.status = "public";

  await note.save();
};

export const _privateNote = async (id) => {
  const note = await NoteModel.findOne({ _id: id });

  if (!note) throw new NotFoundError("Invalid note id");

  note.status = "private";

  await note.save();
};

export const _shareNote = async (req) => {
  const { id } = req.params;

  const { userId } = req.body;

  const note = await NoteModel.findOne({ _id: id });

  if (!note) throw new NotFoundError("Invalid note id");

  if (note.status === "private")
    throw new BadRequestError("This note is private");

  if (note.auth === userId)
    throw new BadRequestError("Sorry, cann't share to ower account");

  const auth = await AuthModel.findOne({ _id: userId });

  if (!auth) throw new NotFoundError("Invalid user id");

  const isExist = note.users.find((user) => user === userId);

  if (isExist) throw new BadRequestError("Already shared");

  note.users = [...note.users, userId];

  await note.save();

  return note;
};
