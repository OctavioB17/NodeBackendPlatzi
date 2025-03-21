import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";
import { IFindAllUsers } from "../../../interfaces/users/get/IFindAll";


@injectable()
export default class FindAllUsers implements IFindAllUsers {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserDTO[]> {
    try {
      const users = await this.userRepository.findAll()
      if (!users) {
        throw new BoomError({
          message: `Users not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return UserMapper.userModelToDTOList(users)
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
