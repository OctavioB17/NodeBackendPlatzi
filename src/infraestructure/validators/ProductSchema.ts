import Joi from "joi";
import { limitQuery, offsetQuery } from "./QuerySchema";

const maxPrice = Joi.number().max(999999999).min(0).default(999999999)
const minPrice = Joi.number().min(0).default(0)
const categoryId = Joi.string().uuid()

export const createProductSchema = Joi.object({
  name: Joi.string().min(15).max(35).required(),
  description: Joi.string().max(3000).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  sku: Joi.string().allow(null).optional(),
  length: Joi.number().positive().min(0).allow(null),
  width: Joi.number().positive().min(0).allow(null),
  height: Joi.number().positive().min(0).allow(null),
  weight: Joi.number().positive().min(0).allow(null).optional(),
  categoryId: Joi.string().uuid().required(),
  material: Joi.string().allow(null).optional(),
  isPaused: Joi.boolean().required(),
})

export const updateProductSchema = Joi.object({
  name: Joi.string().max(60).optional(),
  description: Joi.string().max(3000).optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  sku: Joi.string().allow(null).optional(),
  length: Joi.number().positive().min(0).allow(null),
  width: Joi.number().positive().min(0).allow(null),
  height: Joi.number().positive().min(0).allow(null),
  weigth: Joi.number().positive().min(0).allow(null).optional(),
  material: Joi.string().optional().allow(null).optional(),
  isPaused: Joi.boolean().optional(),
})

export const getProductSchema = Joi.object({
  id: Joi.string().uuid().required()
})

export const getMultipleProductSchema = Joi.object({
  ids: Joi.array().items(Joi.string().uuid()).required()
})

export const updateStockSchema = Joi.object({
  stock: Joi.number().positive().required()
})

export const getProductSchemaByName = Joi.object({
  name: Joi.string().required()
})

export const updatePhotosSchema = Joi.object({
  id: Joi.string().uuid().required(),
  photos: Joi.array().required()
})

export const getProductWPaginationAndPriceOperators = Joi.object({
  limit: limitQuery.optional(),
  offset: offsetQuery.optional(),
  maxPrice: maxPrice.optional(),
  minPrice: minPrice.optional(),
  categoryId: categoryId.optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  nameOrder: Joi.string().optional(),
  priceOrder: Joi.string().optional(),
})
