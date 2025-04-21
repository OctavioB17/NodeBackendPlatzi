import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "../../types";
import ILocalStrategyServices from "../services/interfaces/auth/ILocalStrategyServices";
import passport from "passport";
import IJwtStrategyServices from "../services/interfaces/auth/IJwtStrategyServices";

@injectable()
export default class PassportConfig {
  constructor(
    @inject(AUTH_TYPES.ILocalStrategyServices) private localStrategyServices: ILocalStrategyServices,
    @inject(AUTH_TYPES.IJwtStrategyServices) private jwtStrategy: IJwtStrategyServices
  ) {
    this.initialize();
  }

  private async initialize() {
    passport.use(await this.localStrategyServices.getStrategy())
    passport.use(this.jwtStrategy.getStrategy())
  }
}
