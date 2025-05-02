import Joi from "joi";

export const loginLocalSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})
