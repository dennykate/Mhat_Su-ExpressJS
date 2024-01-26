import Joi from "joi";

export const GoogleAuthSchema = Joi.object({
  access_token: Joi.string().required(),
});

export const FacebookAuthSchema = Joi.object({
  access_token: Joi.string().required(),
});
