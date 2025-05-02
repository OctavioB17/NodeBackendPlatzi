import { inject, injectable } from "inversify";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import { AWS_TYPES } from "../../../types";
import { IDeleteUserFolder } from "../../interfaces/aws/IDeleteUserFolder";
import IDeleteFolderInS3 from "../../interfaces/aws/IDeleteFolderInS3";

@injectable()
export default class DeleteUserFolder implements IDeleteUserFolder {
  constructor(@inject(AWS_TYPES.IDeleteFolderInS3) private deleteFolderInS3: IDeleteFolderInS3) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.deleteFolderInS3.execute(userId);
    } catch (error) {
      throw new BoomError({
        message: `Failed to delete folder for user ${userId}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}