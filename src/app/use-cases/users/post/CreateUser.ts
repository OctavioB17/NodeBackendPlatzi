import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import { IIdGenerator } from "../../../../infraestructure/services/interfaces/IIdGenerator";
import {AWS_TYPES, ENCRYPTION_TYPES, MAIL_TYPES, USER_TYPES, UTIL_TYPES} from "../../../../types";
import { ICreateUser } from "../../../interfaces/users/post/ICreateUser";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import UserDTO from "../../../../infraestructure/dtos/users/UserDTO";
import IHashCode from "../../../interfaces/encryption/IHashCode";
import ISendConfirmationEmail from "../../../interfaces/users/mail/ISendConfirmationEmail";
import { ICreateUserFolder } from "../../../interfaces/aws/ICreateUserFolder";


@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper,
    @inject(ENCRYPTION_TYPES.IHashCode) private hashCode: IHashCode,
    @inject(MAIL_TYPES.ISendConfirmationEmail) private sendConfirmationMail: ISendConfirmationEmail,
    @inject(AWS_TYPES.ICreateUserFolder) private createUserFolder: ICreateUserFolder
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

      if (!userDto.password) {
        throw new BoomError({
          message: `Password required`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        })
      }
    const newUser = {
      ...userDto,
      id: this.idGenerator.generate(),
      password: await this.hashCode.hash(userDto.password)
    };

    const user = this.userMapper.dtoToUser(newUser)
    const userCreation = await this.userRepository.createUser(user);

    try {
      await this.sendConfirmationMail.execute(user);
    } catch (error) {
      await this.userRepository.deleteUser(user.getId());
      throw new BoomError({
        message: `Error sending confirmation email. User creation rolled back.`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }

    await this.createUserFolder.execute(user.getId())

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
