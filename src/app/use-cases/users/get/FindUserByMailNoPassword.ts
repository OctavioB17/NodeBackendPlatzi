import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmailNoPassword } from "../../../interfaces/users/get/IFindUserByEmailNoPassword";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";


@injectable()
export default class FindUserByMailNoPassword implements IFindUserByEmailNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
  ) {}

  async execute(email: string): Promise<UserNoPasswordDTO | null> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new BoomError({
          message: `User ${email} Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return this.userMapper.userToNoPasswordDTO(user)
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
