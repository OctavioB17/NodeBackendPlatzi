import Boom from "@hapi/boom"
import { Request, Response, NextFunction } from "express";
import Joi from "joi"

export const validatorHandler = (schema: Joi.AnySchema, property: "body" | "params" | "query") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const messages = error.details.map(err => err.message);
      return next(Boom.badRequest(messages.join(', ')));
    }
    next();
  };
};