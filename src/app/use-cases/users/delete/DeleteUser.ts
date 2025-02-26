import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IDeleteUser } from "../../../interfaces/users/delete/IDeleteUser";


@injectable()
export default class DeleteUser implements IDeleteUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    try {
      const isUserDeleted = await this.userRepository.deleteUser(id)
      return isUserDeleted
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`)
    }
  }
}
