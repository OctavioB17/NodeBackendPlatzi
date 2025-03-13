import Joi from "joi";
import Product from "../../domain/entities/Product";
import { productSchema } from "./ProductSchema";

export const categorySchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  description: Joi.string().max(3000).required(),
  products: Joi.array().items(productSchema).allow(null)
})
