import Joi from "joi";

const id = Joi.string().uuid()
const userId = Joi.string();
const status = Joi.string()
const totalPrice = Joi.number()
const paymentMethod = Joi.string()
const taxes = Joi.array().items(
  Joi.object({
    type: Joi.string(),
    number: Joi.number()
  })
)

export const createOrderSchema = Joi.object({
  userId: userId.required(),
  status: status.required(),
  totalPrice: totalPrice.required(),
  paymentMethod: paymentMethod.required(),
  taxes: taxes.optional()
})

export const updateOrderSchema = Joi.object({
  id: id.required(),
  totalPrice: totalPrice.optional(),
  paymentMethod: paymentMethod.optional(),
  taxes: taxes.optional()
})

export const updateStatusOrderSchema = Joi.object({
  id: id.required(),
  status: status.required()
})

export const getOrderSchema = Joi.object({
  id: id.required()
})