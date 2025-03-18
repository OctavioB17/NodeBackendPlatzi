import Joi from "joi";
import { createProductSchema, updateProductSchema } from "./ProductSchema";

export const createCategorySchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().max(3000).required(),
  products: Joi.array().items(createProductSchema).allow(null).optional()
})

export const updateCategorySchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().optional(),
  description: Joi.string().max(3000).optional(),
  products: Joi.array().items(updateProductSchema).allow(null).optional()
});

export const getCategorySchema = Joi.object({
  id: Joi.string().uuid().required()
});