import { inject } from "inversify";
import { AWS_TYPES } from "../../../types";
import ICreateFolderInS3 from "../../interfaces/aws/ICreateFolderInS3";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

export default class CreateFolderInS3 implements ICreateFolderInS3 {
  constructor(
    @inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices
  ) {}

  async execute(folderName: string): Promise<void> {
    try {
      await this.awsServices.createFolder(folderName);
    } catch (error) {
      throw new BoomError({
        message: `Error creating folder in S3: ${folderName}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}

