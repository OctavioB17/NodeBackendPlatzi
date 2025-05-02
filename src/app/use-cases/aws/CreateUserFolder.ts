  import { inject, injectable } from "inversify";
  import { BoomError } from "../../../domain/entities/DomainError";
  import { ErrorType } from "../../../domain/interfaces/Error";
  import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
  import { AWS_TYPES } from "../../../types";
  import { ICreateUserFolder } from "../../interfaces/aws/ICreateUserFolder";
  import ICreateFolderInS3 from "../../interfaces/aws/ICreateFolderInS3";

  @injectable()
  export default class CreateUserFolder implements ICreateUserFolder {
    constructor(@inject(AWS_TYPES.ICreateFolderInS3) private createFolderInS3: ICreateFolderInS3) {}

    async execute(userId: string): Promise<void> {
      try {
        await this.createFolderInS3.execute(userId);
      } catch (error) {
        throw new BoomError({
          message: `Failed to create user folder`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    }
  }