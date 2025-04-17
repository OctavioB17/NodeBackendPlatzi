import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "../../types";
import ILocalStrategyServices from "../services/interfaces/ILocalStrategyServices";
import passport from "passport";

@injectable()
export default class PassportConfig {
  constructor(@inject(AUTH_TYPES.ILocalStrategyServices) private localStrategyServices: ILocalStrategyServices) {
    this.initialize();
  }

  private async initialize() {
    passport.use(await this.localStrategyServices.getStrategy())
  }
}