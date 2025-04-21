import { Strategy } from "passport-local";
import ILocalStrategyServices from "../../interfaces/auth/ILocalStrategyServices";
import ILocalLogin from "../../../../app/interfaces/auth/strategies/ILocalLogin";
import { AUTH_TYPES } from "../../../../types";
import { inject, injectable } from "inversify";

@injectable()
export default class LocalStrategyServices implements ILocalStrategyServices {

  private localLogin: ILocalLogin

  constructor(@inject(AUTH_TYPES.ILocalLogin) localLogin: ILocalLogin) {
    this.localLogin = localLogin
  }

  async getStrategy(): Promise<Strategy> {
    return new Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email: string, password: string, done: (error: any, user?: any, info?: any) => void) => {
        try {
          const user = await this.localLogin.login(email, password)
          return done(null, user)
        } catch (error) {
          return done(error, false);
        }
      }
    )
  }
}
