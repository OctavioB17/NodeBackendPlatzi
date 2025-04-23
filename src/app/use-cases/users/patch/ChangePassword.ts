import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {AUTH_TYPES, ENCRYPTION_TYPES, USER_TYPES} from "../../../../types";
import { IChangePassword } from "../../../interfaces/users/patch/IChangePassword";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import User from "../../../../domain/entities/Users";
import { IFindUserById } from "../../../interfaces/users/get/IFindUserById";
import IJwtServices from "../../../../infraestructure/services/interfaces/IJwtServices";
import IHashCode from "../../../interfaces/encryption/IHashCode";


@injectable()
export default class ChangePassword implements IChangePassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IFindUserById) private findUserById: IFindUserById,
    @inject(AUTH_TYPES.IJwtServices) private jwtServices: IJwtServices,
    @inject(ENCRYPTION_TYPES.IHashCode) private hashPassword: IHashCode
  ) {}

  async execute(newPassword: string, token: string, userId: string): Promise<User> {
    try {
      const user = await this.findUserById.execute(userId);
      if (!user) {
        throw new BoomError({
          message: `User not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }
      const tokenConfirmation = this.jwtServices.verifyToken(token)
      if (!tokenConfirmation) {
        throw new BoomError({
          message: `Invalid or expired token`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 422
        })
      }
      const encryptedPasssword = await this.hashPassword.hash(newPassword)
      const changePassword = await this.userRepository.changePassword(encryptedPasssword, userId)
      if (!changePassword) {
        throw new BoomError({
          message: `Error changing password`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
      }

      return changePassword
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
