import { inject, injectable } from "inversify";
import IJwtServices from "../../../infraestructure/services/interfaces/IJwtServices";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import UserJwtPayload from "../../../infraestructure/dtos/users/UserJwtPayloadDTO";
import { AUTH_TYPES, USER_TYPES } from "../../../types";
import { IUserRepository } from "../../../domain/repositories/IUsersRepository";
import IRenewAccessToken from "../../interfaces/auth/IRenewAccessToken";

@injectable()
export default class RenewAccessToken implements IRenewAccessToken {
  private jwtServices: IJwtServices;
  private userRepository: IUserRepository;

  constructor(
    @inject(AUTH_TYPES.IJwtServices) jwtServices: IJwtServices,
    @inject(USER_TYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this.jwtServices = jwtServices;
    this.userRepository = userRepository;
  }

  async execute(refreshToken: string, expirationTime: string): Promise<string> {
    try {
      const payload = this.jwtServices.verifyToken(refreshToken) as UserJwtPayload;

      const userRefreshToken = await this.userRepository.getRefreshToken(payload.id);
      if (userRefreshToken !== refreshToken) {
        throw new BoomError({
          message: 'Refresh token inválido',
          type: ErrorType.UNAUTHORIZED,
          statusCode: 401,
        });
      }

      const newAccessToken = this.jwtServices.signToken({ id: payload.id, role: payload.role }, expirationTime);

      return newAccessToken;
    } catch (error) {
      throw new BoomError({
        message: 'Error al renovar el token',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      });
    }
  }
}