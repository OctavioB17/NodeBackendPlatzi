import Joi from "joi";
import { UserRolesEnum } from "../../domain/interfaces/user/UserRoles";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).pattern(/^[^0-9]*$/).required(),
  surname: Joi.string().min(2).max(100).pattern(/^[^0-9]*$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(/^(?=.*[A-Z]).*$/).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/).required(),
})

export const updateUserSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().min(2).max(100).pattern(/^[^0-9]*$/).optional(),
  surname: Joi.string().min(2).max(100).pattern(/^[^0-9]*$/).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).pattern(/^(?=.*[A-Z]).*$/).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/).optional(),
})

export const updateRoleSchema = Joi.object({
  role: Joi.string().valid(...Object.values(UserRolesEnum)).default(UserRolesEnum.USER).optional()
})

export const updatePasswordUserSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  token: Joi.string().required()
})

export const updatePasswordSchema = Joi.object({
  password: Joi.string().min(6).pattern(/^(?=.*[A-Z]).*$/).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/).required()
})

export const getUserSchema = Joi.object({
  id: Joi.string().uuid().required(),
})

export const getUserSchemaEmail = Joi.object({
  email: Joi.string().email().required(),
})