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
  list: [
    {
      _id: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      priority: {
        type: Number,
        required: true,
      },
      is_complete: {
        type: Boolean,
        required: true,
      },
      is_fail: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const NoteModel = modelNames.Note || model("Note", NoteSchema);

export default NoteModel;
