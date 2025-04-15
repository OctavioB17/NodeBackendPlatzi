import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IFindAllUsers } from "../../../interfaces/users/get/IFindAll";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import User from "../../../../domain/entities/Users";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { validatePaginationParams } from "../../../../infraestructure/utils/ValidatePaginationParams";


@injectable()
export default class FindAllUsers implements IFindAllUsers {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(limit: number, offset: number): Promise<IPagination<User[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const users = await this.userRepository.findAll(validatedLimit, validatedOffset)
      if (!users) {
        throw new BoomError({
          message: `Users not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      const dataWPagination = PaginationMapper.paginationResponseMapper(users, validatedLimit, validatedOffset)
      return dataWPagination
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `Error finding user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
