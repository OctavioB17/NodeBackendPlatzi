import { ErrorType, ErrorProps } from "../interfaces/Error";

export class BoomError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;

  constructor( props: ErrorProps ) {
    super(props.message);
    this.type = props.type
    this.statusCode = props.statusCode
    this.name = this.constructor.name
  }

  notFound(message: string): BoomError {
    return new BoomError({
      message,
      type: ErrorType.NOT_FOUND,
      statusCode: 404
    })
  }

  badRequest(message: string): BoomError {
    return new BoomError({
      message,
      type: ErrorType.BAD_REQUEST,
      statusCode: 400
    });
  }

  validationError(message: string): BoomError {
    return new BoomError({
      message,
      type: ErrorType.VALIDATION_ERROR,
      statusCode: 400
    });
  }

  unauthorized(message: string): BoomError {
    return new BoomError({
      message,
      type: ErrorType.UNAUTHORIZED,
      statusCode: 401
    });
  }

  internalError(message: string): BoomError {
    return new BoomError({
      message,
      type: ErrorType.INTERNAL_ERROR,
      statusCode: 500
    })
  }
}
