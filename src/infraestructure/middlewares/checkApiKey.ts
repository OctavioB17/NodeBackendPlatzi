import { NextFunction, Request, Response } from "express";
import { BoomError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next()
  } else {
    throw new BoomError({
      message: `User not authorized`,
      type: ErrorType.UNAUTHORIZED,
      statusCode: 401
    });
  }
}
