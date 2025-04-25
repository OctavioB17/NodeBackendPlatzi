import { inject, injectable } from "inversify";
import { AWS_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IDeleteProductPhoto from "../../../interfaces/products/delete/IDeleteProductPhoto";
import IDeleteFile from "../../../interfaces/aws/IDeleteFileInS3";

@injectable()
export default class DeleteProductPhotoUseCase implements IDeleteProductPhoto {
  constructor(@inject(AWS_TYPES.IDeleteFileInS3) private deleteFile: IDeleteFile) {}

  async execute(userId: string, productId: string): Promise<void> {
    try {
      console.log(userId, productId)
      await this.deleteFile.execute(userId, productId);
    } catch (error) {
      throw new BoomError({
        message: `Error deleting product photo: ${productId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      });
    }
  }
}