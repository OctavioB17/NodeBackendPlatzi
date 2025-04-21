import { ExtractJwt, Strategy } from "passport-jwt";
import IJwtStrategyServices from "../../interfaces/auth/IJwtStrategyServices";
import { config } from "dotenv";
config()

export default class JwtStrategyServices implements IJwtStrategyServices {
  private options: any

  constructor() {
     this.options = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_KEY }
  }


  getStrategy(): Strategy {
    return new Strategy(this.options, (payload, done) => {
      return done(null, payload)
    })
  }
}