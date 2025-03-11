import { badData, badRequest, Boom, internal, notFound, unauthorized } from "@hapi/boom";
import { DomainError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";

export class ErrorAdapter {
  public toBoom(error: DomainError): Boom {
    switch (error.type) {
      case ErrorType.NOT_FOUND:
        return notFound(error.message);
      case ErrorType.BAD_REQUEST:
        return badRequest(error.message);
      case ErrorType.VALIDATION_ERROR:
        return badData(error.message)
      case ErrorType.UNAUTHORIZED:
        return unauthorized(error.message);
      case ErrorType.INTERNAL_ERROR:
        return internal(error.message)
      default:
        return internal(error.message);
    }
  }
}
