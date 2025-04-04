import { inject, injectable } from "inversify";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmail } from "../../../interfaces/users/get/IFindUserByEmail";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { BoomError } from "../../../../domain/entities/DomainError";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import User from "../../../../domain/entities/Users";


@injectable()
export default class FindUserByMail implements IFindUserByEmail {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
  ) {}

  async execute(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new BoomError({
          message: `User ${email} Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return user
    } catch (error) {
        if (error instanceof BoomError) {
          throw error;
        }
        throw new BoomError({
        message: `Error finding user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
