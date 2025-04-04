import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByIdNoPassword } from "../../../interfaces/users/get/IFindUserByIdNoPassword";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";


@injectable()
export default class FindUserIdNoPassword implements IFindUserByIdNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
  ) {}

  async execute(id: string): Promise<UserNoPasswordDTO | null> {
    try {
      const user = await this.userRepository.findById(id)
      if (!user) {
        throw new BoomError({
          message: `User ${id} Not Found`,
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
