import { inject, injectable } from "inversify";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmail } from "../../../interfaces/users/get/IFindUserByEmail";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { DomainError } from "../../../../domain/entities/DomainError";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";


@injectable()
export default class FindUserByMail implements IFindUserByEmail {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<UserDTO> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new DomainError({
          message: `User ${email} Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return UserMapper.toDTO(user)
    } catch (error) {
        if (error instanceof DomainError) {
          throw error;
        }
        throw new DomainError({
        message: `Error finding user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
