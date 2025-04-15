  import { inject, injectable } from "inversify";
  import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
  import {USER_TYPES} from "../../../../types";
  import { IFindUserById } from "../../../interfaces/users/get/IFindUserById";
  import { BoomError } from "../../../../domain/entities/DomainError";
  import { ErrorType } from "../../../../domain/interfaces/Error";
  import UserMapper from "../../../../infraestructure/mappers/UserMapper";
  import UserDTO from "../../../../infraestructure/dtos/users/UserDTO";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import User from "../../../../domain/entities/Users";


  @injectable()
  export default class FindUserById implements IFindUserById {
    constructor(
      @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
      @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
    ) {}

    async execute(id: string): Promise<User> {
      try {
        const user = await this.userRepository.findById(id)
        if (!user) {
          throw new BoomError({
            message: `User ${id} Not Found`,
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
