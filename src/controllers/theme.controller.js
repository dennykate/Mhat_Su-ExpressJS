import tryCatch from "../helper/tryCatch.js";
import {
  _createTheme,
  _deleteTheme,
  _getThemes,
  _setDefault,
  _updateTheme,
} from "../services/theme.service.js";

export const getThemes = tryCatch(async (req, res) => {
  const themes = await _getThemes(req);

  return res.success(themes);
});

export const updateTheme = tryCatch(async (req, res) => {
  const response = await _updateTheme(req);

  return res.success(response);
});

export const deleteTheme = tryCatch(async (req, res) => {
  await _deleteTheme(req);

  return res.success({ message: "successfully deleted" });
});

export const setDefault = tryCatch(async (req, res) => {
  const theme = await _setDefault(req);

  return res.success(theme);
});
