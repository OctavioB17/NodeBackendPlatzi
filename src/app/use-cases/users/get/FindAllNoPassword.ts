import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { IFindAllUsersNoPassword } from "../../../interfaces/users/get/IFindAllUsersNoPassword";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { BoomError } from "../../../../domain/entities/DomainError";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";


@injectable()
export default class FindAllNoPassword implements IFindAllUsersNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
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
      console.log(users)
      console.log(this.userMapper)
      console.log(this.userMapper.userToNoPasswordDTO(users[0]))
      console.log(this.userMapper.userToNoPasswordDTOList(users))
      return this.userMapper.userToNoPasswordDTOList(users)
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
