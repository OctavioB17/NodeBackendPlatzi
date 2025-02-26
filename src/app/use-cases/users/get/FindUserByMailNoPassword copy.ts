import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { IFindUserByEmailNoPassword } from "../../../interfaces/users/get/IFindUserByEmailNoPassword";
import { UserNoPasswordDTO } from "../../../dtos/UserDTO";


@injectable()
export default class FindUserByMailNoPassword implements IFindUserByEmailNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<UserNoPasswordDTO| null> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (user) {
        return userMapper.map(user, {} as UserNoPasswordDTO)
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`)
    }
  }
}
