import { inject, injectable } from "inversify";
import ICompareHash from "../../interfaces/encryption/ICompareHash";
import IEncriptionServices from "../../../infraestructure/services/interfaces/IEncryptionServices";
import { ENCRYPTION_TYPES } from "../../../types";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class CompareHash implements ICompareHash {
  private encryptionServices: IEncriptionServices

  constructor(
    @inject(ENCRYPTION_TYPES.IEncryptionServices) encryptionServices: IEncriptionServices
  ) {
    this.encryptionServices = encryptionServices
  }

  async compare(toCompare: string, hash: string): Promise<boolean> {
    try {
      return await this.encryptionServices.compare(toCompare, hash)
    } catch (error: any) {
      throw new BoomError({
        message: `Error comparing hash: ${error.message}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
     })
    }
  }
}