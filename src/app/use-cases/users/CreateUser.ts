import { inject, injectable } from "inversify";
import User from "../../../domain/entities/User";
import { UserDTO } from "../../dtos/UserDTO";
import { ICreateUser } from "../../interfaces/users/ICreateUser";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IIdGenerator } from "../../../domain/services/utils/IIdGenerator";
import { IUser } from "../../../domain/interfaces/user/IUser";


@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
    @inject("IIdGenerator") private idGenerator: IIdGenerator
  ) {}

  async execute(userDTO: UserDTO): Promise<IUser> {
    const userId = this.idGenerator.generate()
    const user = new User(userId, userDTO.name, userDTO.surname, userDTO.password, userDTO.email);
    return this.userRepository.createUser(user)
  }

}
