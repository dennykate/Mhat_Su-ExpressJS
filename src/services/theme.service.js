import { NotFoundError } from "../helper/customErrors.js";

import ThemeModel from "../models/theme.model.js";

export const _getThemes = async (req) => {
  const auth = req.user._id;
  const themes = await ThemeModel.findOne({ auth });

  return themes;
};

export const _createTheme = async (auth, body) => {
  const { name, bg_color, font_family } = body;
  const theme = await ThemeModel.create({
    auth,
    name,
    bg_color,
    font_family,
  });

  return theme;
};

export const _updateTheme = async (req) => {
  const name = req.body.name;
  const bg_color = req.body.bg_color;
  const font_family = req.body.font_family;
  const auth = req.user._id;

  const theme = await ThemeModel.findOne({ auth });

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

export const _setDefault = async (req) => {
  const auth = req.user._id;
  const theme = await ThemeModel.findOne({ auth });

  theme.name = "default";
  theme.bg_color = "#f5f5f5";
  theme.font_family = "roboto";

  await theme.save();

  return theme;
};
