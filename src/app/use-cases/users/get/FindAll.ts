import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IFindAll } from "../../../interfaces/users/get/IFindAll";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";


@injectable()
export default class FindAll implements IFindAll {
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

      return UserMapper.toDTOList(users)
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
