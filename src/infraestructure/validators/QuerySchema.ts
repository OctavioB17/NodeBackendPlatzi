import Joi from "joi";

export const paginationSchema = Joi.object({
  limit: Joi.number().integer().min(0).default(10).max(100).optional(),
  offset: Joi.number().integer().min(0).default(0).optional()
})