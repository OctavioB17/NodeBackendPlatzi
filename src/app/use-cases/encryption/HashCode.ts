import { inject, injectable } from "inversify";
import IEncriptionServices from "../../../infraestructure/services/interfaces/IEncryptionServices";
import { ENCRYPTION_TYPES } from "../../../types";
import IHashCode from "../../interfaces/encryption/IHashCode";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class HashCode implements IHashCode {
  private saltRounds: number
  private encryptionServices: IEncriptionServices

  constructor(
    @inject(ENCRYPTION_TYPES.IEncryptionServices) encryptionServices: IEncriptionServices,
    saltRounds: number = 10
  ) {
    this.saltRounds = saltRounds,
    this.encryptionServices = encryptionServices
  }

  hash(toHash: string): Promise<string> {
    try {
      return this.encryptionServices.hash(toHash, this.saltRounds)
    } catch (error: any) {
      throw new BoomError({
        message: `Error hashing code: ${error.message}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
