import { inject, injectable } from "inversify";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmail } from "../../../interfaces/users/get/IFindUserByEmail";


@injectable()
export default class FindUserByMail implements IFindUserByEmail {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<IUser| null> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (user) {
        return userMapper.map(user, {} as IUser)
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`)
    }
  }
}
