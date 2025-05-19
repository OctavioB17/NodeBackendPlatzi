import { inject, injectable } from "inversify";
import { AWS_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IDeleteProductPhoto from "../../../interfaces/products/delete/IDeleteProductPhoto";
import IDeleteFile from "../../../interfaces/aws/IDeleteFileInS3";

@injectable()
export default class DeleteProductPhoto implements IDeleteProductPhoto {
  constructor(
  @inject(AWS_TYPES.IDeleteFileInS3) private deleteFile: IDeleteFile,
  ) {}

  async execute(userId: string, photoAndProductId: string): Promise<void> {
    try {
      console.log(`${photoAndProductId}`);
      await this.deleteFile.execute(`${userId}/${photoAndProductId}`);
    } catch (error) {
      throw new BoomError({
        message: `Error deleting product photo: ${photoAndProductId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      });
    }
  }
}