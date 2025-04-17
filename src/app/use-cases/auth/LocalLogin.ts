import { inject, injectable } from "inversify";
import ILocalStrategy from "../../interfaces/auth/strategies/ILocalLogin";
import { USER_TYPES, ENCRYPTION_TYPES, AUTH_TYPES } from "../../../types";
import ICompareHash from "../../interfaces/encryption/ICompareHash";
import { IFindUserByEmail } from "../../interfaces/users/get/IFindUserByEmail";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import User from "../../../domain/entities/Users";
import ISignToken from "../../interfaces/auth/ISignToken";

@injectable()
export default class LocalStrategy implements ILocalStrategy {
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
