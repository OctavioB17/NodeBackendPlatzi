import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import { IDeleteUserFolder } from "../../interfaces/aws/IDeleteUserFolder";

@injectable()
export default class DeleteUserFolder implements IDeleteUserFolder {
  constructor(@inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.awsServices.deleteUserFolder(userId);
    } catch (error) {
      throw new BoomError({
        message: `Failed to delete folder for user ${userId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}