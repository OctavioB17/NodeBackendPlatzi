import Joi from "joi";

const dimensionsSchema = Joi.object({
  length: Joi.number().positive().min(0).allow(null),
  width: Joi.number().positive().min(0).allow(null),
  height: Joi.number().positive().min(0).allow(null)
}).allow(null);

export const productSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(60).required(),
  description: Joi.string().max(3000).required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  sku: Joi.string().allow(null),
  dimensions: dimensionsSchema,
  weigth: Joi.number().positive().min(0).allow(null),
  categoryId: Joi.string().uuid().required(),
  material: Joi.string().required().allow(null),
  isPaused: Joi.boolean().required(),
  userId: Joi.string().uuid()
})