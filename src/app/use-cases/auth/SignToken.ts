import { inject, injectable } from "inversify";
import IJwtServices from "../../../infraestructure/services/interfaces/IJwtServices";
import ISignToken from "../../interfaces/auth/ISignToken";
import { AUTH_TYPES, USER_TYPES } from "../../../types";
import User from "../../../domain/entities/Users";
import IUserMapper from "../../../infraestructure/mappers/interfaces/IUserMapper";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class SignToken implements ISignToken {
  private jwtServices: IJwtServices
  private userMapper: IUserMapper

  constructor(
    @inject(AUTH_TYPES.IJwtServices) jwtServices: IJwtServices,
    @inject(USER_TYPES.IUserMapper) userMapper: IUserMapper
  ) {
    this.jwtServices = jwtServices,
    this.userMapper = userMapper
  }

  sign(user: User): string {
    try {
      const userToJwtDto = this.userMapper.UserToUserJwtPayload(user)
      return this.jwtServices.signToken(userToJwtDto)
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: 'Error to sign code',
        type: ErrorType.NOT_FOUND,
        statusCode: 404,
      })
    }
  }
}