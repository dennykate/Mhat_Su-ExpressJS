import { Schema, model, modelNames } from "mongoose";

export const ThemeSchema = new Schema({
  auth: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bg_color: {
    type: String,
    required: true,
  },
  font_family: {
    type: String,
    required: true,
  },
});

const ThemeModel = modelNames.Theme || model("Theme", ThemeSchema);

export default ThemeModel;
