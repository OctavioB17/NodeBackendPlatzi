import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmailNoPassword } from "../../../interfaces/users/get/IFindUserByEmailNoPassword";
import { DomainError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";
import UserMapper from "../../../../infraestructure/mappers/UserMapper";


@injectable()
export default class FindUserByMailNoPassword implements IFindUserByEmailNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<UserNoPasswordDTO | null> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new DomainError({
          message: `User ${email} Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return UserMapper.toNoPasswordDTO(user)
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
