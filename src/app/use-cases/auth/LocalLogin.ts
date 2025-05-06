import { inject, injectable } from "inversify";
import { AUTH_TYPES, ENCRYPTION_TYPES, USER_TYPES } from "../../../types";
import { IFindUserByEmail } from "../../interfaces/users/get/IFindUserByEmail";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import ILocalLogin from "../../interfaces/auth/strategies/ILocalLogin";
import ISignToken from "../../interfaces/auth/ISignToken";
import ICompareHash from "../../interfaces/encryption/ICompareHash";

@injectable()
export default class LocalLogin implements ILocalLogin {
  private findUserByMail: IFindUserByEmail;
  private hashCompare: ICompareHash;
  private signToken: ISignToken;

  constructor(
    @inject(USER_TYPES.IFindUserByEmail) findUserByMail: IFindUserByEmail,
    @inject(ENCRYPTION_TYPES.ICompareHash) hashCompare: ICompareHash,
    @inject(AUTH_TYPES.ISignToken) signToken: ISignToken
  ) {
    this.findUserByMail = findUserByMail,
    this.hashCompare = hashCompare
    this.signToken = signToken
  }


  async login(email: string, password: string): Promise<string> {
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

      return this.signToken.sign(user);
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
