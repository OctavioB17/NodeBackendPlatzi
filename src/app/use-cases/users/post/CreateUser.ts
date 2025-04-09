import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import {USER_TYPES, UTIL_TYPES} from "../../../../types";
import { ICreateUser } from "../../../interfaces/users/post/ICreateUser";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import UserDTO from "../../../../infraestructure/dtos/users/UserDTO";


@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
  ) {}

  async execute(userDto: UserDTO): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findByEmail(userDto.email);
      if (existingUser) {
        throw new BoomError({
          message: `Mail ${userDto.email} already registered`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        })
      }

    const newUser = {
      ...userDto,
      id: this.idGenerator.generate(),
    };
    const user = this.userMapper.dtoToUser(newUser)
    const userCreation = await this.userRepository.createUser(user);
    return !!userCreation
    } catch (error) {
        if (error instanceof BoomError) {
          throw error;
        }
        throw new BoomError({
          message: `Error creating user`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
    }
  }
}
