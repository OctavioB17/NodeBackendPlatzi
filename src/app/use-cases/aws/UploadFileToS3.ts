import { inject, injectable } from "inversify";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import IUploadFileToS3 from "../../interfaces/aws/IUploadFileToS3";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class UploadFileToS3 implements IUploadFileToS3 {

  private awsServices: IAwsServices

  constructor(@inject(AWS_TYPES.IAwsServices) awsServices: IAwsServices) {
    this.awsServices = awsServices
  }

  execute(fileKey: string, file: Buffer, mimeType: string): Promise<string> {
    try {
      const uploadFile = this.awsServices.uploadFile( file, fileKey, mimeType)
      if (!uploadFile) {
        throw new BoomError({
          message: 'Failed to upload file to s3 bucket',
          statusCode: 500,
          type: ErrorType.INTERNAL_ERROR
        })
      }

      return uploadFile
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error to upload file`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}