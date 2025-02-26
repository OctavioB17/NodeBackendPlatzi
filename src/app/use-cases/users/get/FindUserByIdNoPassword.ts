import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { IFindUserByIdNoPassword } from "../../../interfaces/users/get/IFindUserByIdNoPassword";
import { UserNoPasswordDTO } from "../../../dtos/UserDTO";


@injectable()
export default class FindUserIdNoPassword implements IFindUserByIdNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserNoPasswordDTO| null> {
    try {
      const user = await this.userRepository.findById(id)
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
