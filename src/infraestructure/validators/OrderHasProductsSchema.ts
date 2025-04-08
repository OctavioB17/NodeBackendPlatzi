import Joi from "joi";

const id = Joi.number()
const orderId = Joi.string().uuid()
const producId = Joi.string().uuid()
const userId = Joi.string().uuid();

const quantity = Joi.number()

export const getOrderSchema = Joi.object({
  id: id.required()
})

export const createOrderSchema = Joi.object({
  userId: userId.required(),
  producId: producId.required(),
  orderId: orderId.required(),
  quantity: quantity.required()
})

export const addItemSchema = Joi.object({
  producId: producId.required(),
  orderId: orderId.required(),
  quantity: quantity.required()
})