import { NotFoundError } from "../helper/customErrors.js";
import { ModelProvider } from "./modelProvider.service.js";
import NoteModel from "../models/note.model.js";

// export const _getNotes = async (req) => {
//   const auth = req.user._id;
//   const notes = await NoteModel.find({ auth });
//   return notes;
// };

export const _getNotes = async (req) => {
  const Model = new ModelProvider(NoteModel, req);

  const [count, data] = await Model.searchWith(["title", "theme"]).get();

  return [count, data];
};

export const _createNote = async (req) => {
  const { title, theme } = req.body;
  const auth = req.user._id;
  const note = await NoteModel.create({
    auth,
    title,
    theme,
  });
  return note;
};

export const _updateNote = async (req) => {
  const { id } = req.params;
  const title = req.body.title;
  const theme = req.body.theme;

  const note = await NoteModel.findOne({ _id: id });

  console.log(note);
  if (!note) throw new NotFoundError();

  note.title = title ?? note.title;
  note.theme = theme ?? note.theme;

  await note.save();

  return note;
};

export const _deleteNote = async (req) => {
  const { id } = req.params;

  const note = await NoteModel.findOne({ _id: id });

  console.log(note);
  if (!note) throw new NotFoundError();

  await note.deleteOne({ _id: id });
};
