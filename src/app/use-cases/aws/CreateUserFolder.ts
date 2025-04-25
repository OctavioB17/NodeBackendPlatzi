import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import { ICreateUserFolder } from "../../interfaces/aws/ICreateUserFolder";


@injectable()
export default class CreateUserFolder implements ICreateUserFolder {
  constructor(@inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.awsServices.createUserFolder(userId);
    } catch (error) {
      throw new BoomError({
        message: `Failed to create user folder`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}