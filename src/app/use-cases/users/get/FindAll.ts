import { inject, injectable } from "inversify";
import { IUser } from "../../../../domain/interfaces/user/IUser";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { userMapper } from "../../../../infraestructure/mappers/UserMapper";
import {USER_TYPES} from "../../../../types";
import { IFindAll } from "../../../interfaces/users/get/IFindAll";


@injectable()
export default class FindAll implements IFindAll {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IUser[] | null> {
    try {
      const user = await this.userRepository.findAll()
      if (user) {
        return userMapper.mapCollection(user, {} as IUser[])
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`)
    }
  }
}
