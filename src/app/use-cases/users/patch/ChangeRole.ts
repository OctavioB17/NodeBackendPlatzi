import { inject, injectable } from "inversify";
import IChangeRole from "../../../interfaces/users/patch/IChangeRole";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import { USER_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { UserRolesEnum } from "../../../../domain/interfaces/user/UserRoles";

@injectable()
export default class ChangeRole implements IChangeRole {
  private userRepository: IUserRepository;

  constructor(@inject(USER_TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: string, newRole: keyof typeof UserRolesEnum): Promise<boolean> {
    try {
      const userUpdate = await this.userRepository.changeUserRole(id, newRole)
      if (!userUpdate) {
        throw new BoomError({
          message: 'Failed to find user',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      } else {
        return true
      }
    } catch (error: any) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `${error.message}`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }

}