import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IChangePassword } from "../../../interfaces/users/patch/IChangePassword";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";


@injectable()
export default class ChangePassword implements IChangePassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(password: string, email: string): Promise<UserDTO> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new BoomError({
          message: `User ${email} Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }
      const changePassword = await this.userRepository.changePassword(password, email)
      if (!changePassword) {
        throw new BoomError({
          message: `Error changing password for user ${email}`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
      }

      return UserMapper.toDTO(changePassword.dataValues)
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
