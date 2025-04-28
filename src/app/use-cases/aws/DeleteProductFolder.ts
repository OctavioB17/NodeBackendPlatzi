import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { IAwsServices } from "../../../infraestructure/services/interfaces/IAwsServices";
import { AWS_TYPES } from "../../../types";
import { IDeleteProductFolder } from "../../interfaces/aws/IDeleteProductFolder";

@injectable()
export default class DeleteProductFolder implements IDeleteProductFolder {
  constructor(@inject(AWS_TYPES.IAwsServices) private awsServices: IAwsServices) {}

  async execute(userId: string, productId: string): Promise<void> {
    try {
      await this.awsServices.deleteFolder(`${userId}/${productId}`);
    } catch (error) {
      throw new BoomError({
        message: `Failed to delete folder for user ${userId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}