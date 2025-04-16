import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import {USER_TYPES} from "../../../../types";
import { IFindAllUsersNoPassword } from "../../../interfaces/users/get/IFindAllUsersNoPassword";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { BoomError } from "../../../../domain/entities/DomainError";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";
import IUserMapper from "../../../../infraestructure/mappers/interfaces/IUserMapper";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import { validatePaginationParams } from "../../../../infraestructure/services/utils/ValidatePaginationParams";


@injectable()
export default class FindAllNoPassword implements IFindAllUsersNoPassword {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper
  ) {}

  async execute(limit: number, offset: number): Promise<IPagination<UserNoPasswordDTO[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const users = await this.userRepository.findAll(validatedLimit, validatedOffset)
      if (!users) {
        throw new BoomError({
          message: `Users Not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }
      const dataDto = this.userMapper.userToNoPasswordDTOList(users)

      const dataWPagination = PaginationMapper.paginationResponseMapper(dataDto, validatedLimit, validatedOffset)
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
