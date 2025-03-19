import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IFindAllNoPassword } from "../../../interfaces/users/get/IFindAllNoPassword";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { BoomError } from "../../../../domain/entities/DomainError";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";


@injectable()
export default class FindAllNoPassword implements IFindAllNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserNoPasswordDTO[] | null> {
    try {
      const users = await this.userRepository.findAll()
      if (!users) {
        throw new BoomError({
          message: `Users Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return UserMapper.userModelToNoPasswordDTOList(users)
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
