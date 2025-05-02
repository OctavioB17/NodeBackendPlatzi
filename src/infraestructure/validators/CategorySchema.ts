import Joi from "joi";

export const createCategorySchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().min(100).max(255).required(),
})

export const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().min(100).max(255).optional(),
});

export const getCategorySchema = Joi.object({
  id: Joi.string().uuid().required()
});

export const getCategorySchemaByName = Joi.object({
  name: Joi.string().required()
});