import Joi from "joi";

const dimensionsSchema = Joi.object({
  length: Joi.number().positive().min(0).allow(null),
  width: Joi.number().positive().min(0).allow(null),
  height: Joi.number().positive().min(0).allow(null)
}).allow(null);

export const createProductSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().max(60).required(),
  description: Joi.string().max(3000).required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  sku: Joi.string().allow(null).optional(),
  dimensions: dimensionsSchema.optional(),
  weigth: Joi.number().positive().min(0).allow(null).optional(),
  categoryId: Joi.string().uuid().required(),
  material: Joi.string().required().allow(null).optional(),
  isPaused: Joi.boolean().required(),
  userId: Joi.string().uuid().required()
})

export const updateProductSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().max(60).optional(),
  description: Joi.string().max(3000).optional(),
  imageUrl: Joi.string().uri().optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  sku: Joi.string().allow(null).optional(),
  dimensions: dimensionsSchema.optional(),
  weigth: Joi.number().positive().min(0).allow(null).optional(),
  categoryId: Joi.string().uuid().optional(),
  material: Joi.string().optional().allow(null).optional(),
  isPaused: Joi.boolean().optional(),
  userId: Joi.string().uuid().optional()
})

export const getProductSchema = Joi.object({
  id: Joi.string().uuid().required()
})