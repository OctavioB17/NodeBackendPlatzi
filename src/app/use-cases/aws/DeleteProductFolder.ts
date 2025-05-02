import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { AWS_TYPES } from "../../../types";
import { IDeleteProductFolder } from "../../interfaces/aws/IDeleteProductFolder";
import IDeleteFolderInS3 from "../../interfaces/aws/IDeleteFolderInS3";

@injectable()
export default class DeleteProductFolder implements IDeleteProductFolder {
  constructor(@inject(AWS_TYPES.IDeleteFolderInS3) private deleteFolderInS3: IDeleteFolderInS3) {}

  async execute(userId: string, productId: string): Promise<void> {
    try {
        await this.deleteFolderInS3.execute(`${userId}/${productId}`);
    } catch (error) {
      throw new BoomError({
        message: `Failed to delete folder for user ${userId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}