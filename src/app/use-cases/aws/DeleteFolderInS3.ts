import { inject, injectable } from "inversify";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import IDeleteFolderInS3 from "../../interfaces/aws/IDeleteFolderInS3";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class DeleteFolderInS3 implements IDeleteFolderInS3 {
  constructor(
    @inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices
  ) {}

  async execute(folderName: string): Promise<void> {
    try {
      await this.awsServices.deleteFolder(folderName);
    } catch (error) {
      throw new BoomError({
        message: `Error deleting folder in S3: ${folderName}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}

