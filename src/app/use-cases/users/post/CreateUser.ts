import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import {USER_TYPES} from "../../../../types";
import { ICreateUser } from "../../../interfaces/users/post/ICreateUser";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IUser } from "../../../../domain/interfaces/user/IUser";


@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IIdGenerator) private idGenerator: IIdGenerator
  ) {}

  async execute(iUser: IUser): Promise<boolean> {
    try {
      const existingUser = await this.userRepository.findByEmail(iUser.email);
      if (existingUser) {
        throw new BoomError({
          message: `Mail ${iUser.email} already registered`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        })
      }

    const newUser: IUser = {
      ...iUser,
      id: this.idGenerator.generate(),
    };

    const userCreation = await this.userRepository.createUser(newUser);
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
