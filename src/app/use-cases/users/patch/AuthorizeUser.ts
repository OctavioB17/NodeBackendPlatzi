import { inject, injectable } from "inversify";
import IAuthorizeUser from "../../../interfaces/users/patch/IAuthorizeUser";
import { USER_TYPES } from "../../../../types";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class AuthorizeUser implements IAuthorizeUser {
  private userRepository: IUserRepository

  constructor(@inject(USER_TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(userId: string): Promise<boolean> {
    try {
      const userUpdate = await this.userRepository.markUserAsAuthorized(userId)
      if (!userUpdate) {
        throw new BoomError({
          message: 'Failed to find user',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      } else {
        return true
      }
    } catch (error: any) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `${error.message}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}