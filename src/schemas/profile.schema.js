import Joi from "joi";

export const GoogleAuthSchema = Joi.object({
  access_token: Joi.string().required(),
});
