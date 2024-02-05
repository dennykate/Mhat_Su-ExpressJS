import Joi from "joi";

export const CreateThemeSchema = Joi.object({
  name: Joi.string().required(),
  bg_color: Joi.string().required(),
  font_family: Joi.string().required(),
});

export const UpdateThemeSchema = Joi.object({
    name: Joi.string(),
    bg_color: Joi.string(),
    font_family: Joi.string(),
});
