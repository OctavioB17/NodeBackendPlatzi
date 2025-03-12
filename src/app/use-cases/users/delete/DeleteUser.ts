import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import {USER_TYPES} from "../../../../types";
import { IDeleteUser } from "../../../interfaces/users/delete/IDeleteUser";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";


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
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `Error deleting user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
