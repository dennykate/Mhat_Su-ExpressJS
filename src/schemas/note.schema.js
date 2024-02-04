import Joi from "joi";

export const CreateNoteSchema = Joi.object({
  title: Joi.string().required(),
  theme: Joi.string().required(),
});

export const UpdateNoteSchema = Joi.object({
  title: Joi.string(),
  theme: Joi.string(),
});
