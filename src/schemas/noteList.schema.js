import Joi from "joi";

export const CreateNoteListSchema = Joi.object({
  text: Joi.string().required(),
  priority: Joi.number(),
});

export const UpdateNoteListSchema = Joi.object({
  text: Joi.string().required(),
  priority: Joi.number().required(),
});
