import Joi from "joi";
import { UserRolesEnum } from "../../domain/interfaces/user/UserRoles";

export const userSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(2).max(100).required(),
  surname: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(/^(?=.*[A-Z]).*$/).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/).required(),
  role: Joi.string().valid(...Object.values(UserRolesEnum)).default(UserRolesEnum.USER)
})