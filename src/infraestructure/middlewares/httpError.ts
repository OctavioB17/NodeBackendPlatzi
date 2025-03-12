import { Boom, isBoom } from "@hapi/boom";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { BoomError } from "../../domain/entities/DomainError";

export const logError: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err)
}

export const boomErrorHandling: ErrorRequestHandler = (err: Error | Boom, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BoomError) {
    const { message, statusCode } = err;
    res.status(statusCode).json({
      statusCode,
      error: err.type,
      message
    });
  } else if (isBoom(err)) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

export const errorHandlingMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = (err as any).statusCode || 500
  res.status(statusCode).json({
    name: err.name,
    message: err.message,
    code: statusCode
  })
}
