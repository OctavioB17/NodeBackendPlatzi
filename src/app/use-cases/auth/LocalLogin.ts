import { inject, injectable } from "inversify";
import ILocalStrategy from "../../interfaces/auth/strategies/ILocalLogin";
import { USER_TYPES, ENCRYPTION_TYPES } from "../../../types";
import ICompareHash from "../../interfaces/encryption/ICompareHash";
import { IFindUserByEmail } from "../../interfaces/users/get/IFindUserByEmail";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
import User from "../../../domain/entities/Users";

@injectable()
export default class LocalStrategy implements ILocalStrategy {
  private findUserByMail: IFindUserByEmail;
  private hashCompare: ICompareHash;

  constructor(
    @inject(USER_TYPES.IFindUserByEmail) findUserByMail: IFindUserByEmail,
    @inject(ENCRYPTION_TYPES.ICompareHash) hashCompare: ICompareHash
  ) {
    this.findUserByMail = findUserByMail,
    this.hashCompare = hashCompare
  }


  async login(email: string, password: string): Promise<User> {
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
      return user;
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
