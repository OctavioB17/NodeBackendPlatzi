import Joi from "joi";

export const loginLocalSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})

export const renewTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});