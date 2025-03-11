import { ErrorType, ErrorProps } from "../interfaces/Error";

export class DomainError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;

  constructor( props: ErrorProps ) {
    super(props.message);
    this.type = props.type
    this.statusCode = props.statusCode
    this.name = this.constructor.name
  }

  notFound(message: string): DomainError {
    return new DomainError({
      message,
      type: ErrorType.NOT_FOUND,
      statusCode: 404
    })
  }

  badRequest(message: string): DomainError {
    return new DomainError({
      message,
      type: ErrorType.BAD_REQUEST,
      statusCode: 400
    });
  }

  validationError(message: string): DomainError {
    return new DomainError({
      message,
      type: ErrorType.VALIDATION_ERROR,
      statusCode: 400
    });
  }

  unauthorized(message: string): DomainError {
    return new DomainError({
      message,
      type: ErrorType.UNAUTHORIZED,
      statusCode: 401
    });
  }

  internalError(message: string): DomainError {
    return new DomainError({
      message,
      type: ErrorType.INTERNAL_ERROR,
      statusCode: 500
    })
  }
}
