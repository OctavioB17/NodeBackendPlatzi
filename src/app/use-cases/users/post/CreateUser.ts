import { inject, injectable } from "inversify";
import User from "../../../../domain/entities/User";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { UserDTO } from "../../../dtos/UserDTO";
import { ICreateUser } from "../../../interfaces/users/post/ICreateUser";


@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IIdGenerator) private idGenerator: IIdGenerator
  ) {}

  async execute(userDTO: UserDTO): Promise<IUser> {
    try {
      const userId = this.idGenerator.generate();
      const user = new User(userId, userDTO.name, userDTO.surname, userDTO.password, userDTO.email);
      const userMapped = userMapper.map<User, IUser>(user, {} as IUser);
      return this.userRepository.createUser(userMapped);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`)
    }
  }
}
