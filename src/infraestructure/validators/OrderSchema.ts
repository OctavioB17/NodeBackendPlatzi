import Joi from "joi";


const id = Joi.string().uuid();
const userId = Joi.string().uuid();
const status = Joi.string().valid('PENDING', 'PAID', 'CANCELLED', 'SHIPPED', 'DELIVERED', 'RETURN', 'REFUNDED');
const totalPrice = Joi.number().positive();
const paymentMethod = Joi.string().valid('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL');
const productId = Joi.string().uuid();
const quantity = Joi.number().integer().positive();
const taxes = Joi.array().items(
  Joi.object({
    type: Joi.string().required(),
    number: Joi.number().positive().required()
  })
);

const orderHasProducts = Joi.array().items(
  Joi.object({
    productId: productId.required(),
    quantity: quantity.required()
  })
).min(1).required();


const createOrderOnlySchema = Joi.object({
  userId: userId.required(),
  status: status.required(),
  paymentMethod: paymentMethod.required(),
});

export const createOrderSchema = Joi.object({
  order: createOrderOnlySchema,
  orderHasProducts: orderHasProducts
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

export const getOrderSchemaByUserId = Joi.object({
  userId: id.required()
})
