import { inject, injectable } from "inversify";
import { AUTH_TYPES, ENCRYPTION_TYPES, USER_TYPES } from "../../../types";
import { IFindUserByEmail } from "../../interfaces/users/get/IFindUserByEmail";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import ILocalLogin from "../../interfaces/auth/strategies/ILocalLogin";
import ISignToken from "../../interfaces/auth/ISignToken";
import ICompareHash from "../../interfaces/encryption/ICompareHash";
import { IUserRepository } from "../../../domain/repositories/IUsersRepository";

@injectable()
export default class LocalLogin implements ILocalLogin {
  private findUserByMail: IFindUserByEmail;
  private hashCompare: ICompareHash;
  private signToken: ISignToken;
  private userRepository: IUserRepository

  constructor(
    @inject(USER_TYPES.IFindUserByEmail) findUserByMail: IFindUserByEmail,
    @inject(ENCRYPTION_TYPES.ICompareHash) hashCompare: ICompareHash,
    @inject(AUTH_TYPES.ISignToken) signToken: ISignToken,
    @inject(USER_TYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this.findUserByMail = findUserByMail,
    this.hashCompare = hashCompare,
    this.signToken = signToken,
    this.userRepository = userRepository
  }


  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.findUserByMail.execute(email)
      if (!user) {
        throw new BoomError({
          message: 'User not found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404,
        })
      }
      if (user.getAuthorized() !== true) {
        throw new BoomError({
          message: 'User not authorized',
          type: ErrorType.UNAUTHORIZED,
          statusCode: 401,
        })
      }
      const comparePassword = await this.hashCompare.compare(password, user.getPassword())
      if (!comparePassword) {
        throw new BoomError({
          message: 'Password does not match',
          type: ErrorType.UNAUTHORIZED,
          statusCode: 401,
        })
      }

      const accessToken = this.signToken.sign(user, '15m');
      const refreshToken = this.signToken.sign(user, '7d');

      await this.userRepository.saveRefreshToken(user.getId(), refreshToken)

      return { accessToken, refreshToken }
    } catch (error: any) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error login user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
