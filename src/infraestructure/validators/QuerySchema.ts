import Joi from "joi";

export const limitQuery = Joi.number().integer().min(0).default(10).max(100).optional();
export const offsetQuery = Joi.number().integer().min(0).default(0).optional()

export const paginationSchema = Joi.object({
  limit: limitQuery,
  offset: offsetQuery
})