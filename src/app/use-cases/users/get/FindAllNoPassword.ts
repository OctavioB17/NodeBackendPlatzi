import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { IFindAllNoPassword } from "../../../interfaces/users/get/IFindAllNoPassword";
import { UserNoPasswordDTO } from "../../../dtos/UserDTO";


@injectable()
export default class FindAllNoPassword implements IFindAllNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserNoPasswordDTO[] | null> {
    try {
      const user = await this.userRepository.findAllNoPassword()
      if (user) {
        return userMapper.mapCollection(user, {} as UserNoPasswordDTO[])
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`)
    }
  }
}
