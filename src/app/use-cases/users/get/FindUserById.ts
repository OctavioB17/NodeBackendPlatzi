  import { inject, injectable } from "inversify";
  import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
  import {USER_TYPES} from "../../../../types";
  import { IFindUserById } from "../../../interfaces/users/get/IFindUserById";
  import { BoomError } from "../../../../domain/entities/DomainError";
  import { ErrorType } from "../../../../domain/interfaces/Error";
  import UserMapper from "../../../../infraestructure/mappers/UserMapper";
  import UserDTO from "../../../../infraestructure/dtos/UserDTO";


  @injectable()
  export default class FindUserById implements IFindUserById {
    constructor(
      @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    ) {}

    async execute(id: string): Promise<UserDTO> {
      try {
        const user = await this.userRepository.findById(id)
        if (!user) {
          throw new BoomError({
            message: `User ${id} Not Found`,
            type: ErrorType.NOT_FOUND,
            statusCode: 404
          })
        }

        return UserMapper.toDTO(user.dataValues)
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
