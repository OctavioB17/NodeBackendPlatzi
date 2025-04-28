import { inject, injectable } from "inversify";
import IUploadProductPhoto from "../../interfaces/products/post/IUploadPhoto";
import { AWS_TYPES } from "../../../types";
import IUploadFileToS3 from "../../interfaces/aws/IUploadFileToS3";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class UploadProductPhoto implements IUploadProductPhoto {
  private uploadFileToS3: IUploadFileToS3

  constructor(@inject(AWS_TYPES.IUploadFileToS3) uploadFileToS3: IUploadFileToS3) {
    this.uploadFileToS3 = uploadFileToS3
  }

  async execute(userId: string, file: Buffer, productId: string, mimetype: string): Promise<string> {
      try {
        const uploadFile = this.uploadFileToS3.execute(userId, file, productId, mimetype)

        if (!uploadFile) {
          throw new BoomError({
            message: `Failed to upload product photo`,
            type: ErrorType.INTERNAL_ERROR,
            statusCode: 500
          });
        }

        return uploadFile
      } catch (error) {
        if (error instanceof BoomError) {
          throw error;
        }

        throw new BoomError({
          message: `Failed to upload product photo`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
  }
}