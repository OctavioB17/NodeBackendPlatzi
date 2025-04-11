import Joi from "joi";

const id = Joi.number()
const orderId = Joi.string().uuid()
const productId = Joi.string().uuid()
const userId = Joi.string().uuid();

const quantity = Joi.number()

export const getOrderSchema = Joi.object({
  id: id.required()
})

export const createOrderSchema = Joi.object({
  userId: userId.required(),
  producId: productId.required(),
  orderId: orderId.required(),
  quantity: quantity.required()
})

export const productAddItemSchema = Joi.object({
  productId: productId.required(),
  quantity: quantity.required()
})

export const addItemSchema = Joi.object({
  orderHasProducts: Joi.array().items(productAddItemSchema).required()
})