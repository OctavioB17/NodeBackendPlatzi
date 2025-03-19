import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByIdNoPassword } from "../../../interfaces/users/get/IFindUserByIdNoPassword";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { plainToInstance } from "class-transformer";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";


@injectable()
export default class FindUserIdNoPassword implements IFindUserByIdNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
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

      return UserMapper.userModelToNoPasswordDTO(user.dataValues)
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
