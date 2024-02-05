import { Schema, model, modelNames } from "mongoose";

export const NoteSchema = new Schema({
  auth: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

const NoteModel = modelNames.Note || model("Note", NoteSchema);

export default NoteModel;