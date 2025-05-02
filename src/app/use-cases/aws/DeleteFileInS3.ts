import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import IDeleteFileInS3 from "../../interfaces/aws/IDeleteFileInS3";


@injectable()
export default class DeleteFileInS3 implements IDeleteFileInS3 {
  constructor(@inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices) {}

  async execute(fileKey: string): Promise<void> {
    try {
      await this.awsServices.deleteFile(fileKey);
    } catch (error) {
      throw new BoomError({
        message: `Failed to delete file ${fileKey}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}