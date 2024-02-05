import { NotFoundError } from "../helper/customErrors.js";

import ThemeModel from "../models/theme.model.js";

export const _getThemes = async (req) => {
  const auth = req.user._id;
  const themes = await ThemeModel.find({ auth });
  return themes;
};

export const _createTheme = async (req) => {
  const { name, bg_color, font_family } = req.body;
  const auth = req.user._id;
  const theme = await ThemeModel.create({
    auth,
    name,
    bg_color,
    font_family,
  });
  return theme;
};

export const _updateTheme = async (req) => {
  const { id } = req.params;
  const name = req.body.name;
  const bg_color = req.body.bg_color;
  const font_family = req.body.font_family;

  const theme = await ThemeModel.findOne({ _id: id });

  console.log(theme);
  if (!theme) throw new NotFoundError();

  theme.name = name ?? theme.name;
  theme.bg_color = bg_color ?? theme.bg_color;
  theme.font_family = font_family ?? theme.font_family;

  await theme.save();

  return theme;
};

export const _deleteTheme = async (req) => {
  const { id } = req.params;

  const theme = await ThemeModel.findOne({ _id: id });

  console.log(theme);
  if (!theme) throw new NotFoundError();

  await theme.deleteOne({ _id: id });
};
