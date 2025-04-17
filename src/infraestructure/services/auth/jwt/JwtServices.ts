import { config } from "dotenv";
import IJwtServices from "../../interfaces/IJwtServices";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { injectable } from "inversify";
import UserJwtPayload from "../../../dtos/users/UserJwtPayloadDTO";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
config()

@injectable()
export default class JwtServices implements IJwtServices {
  private jwtKey: string | undefined

  constructor() {
    this.jwtKey = process.env.JWT_KEY
  }

  signToken(payload: UserJwtPayload): string {
    try {
      if (!this.jwtKey) {
        throw new BoomError({
          message: 'Error to read key',
          type: ErrorType.UNAUTHORIZED,
          statusCode: 401,
        })
      }
      return jwt.sign(payload, this.jwtKey)
    } catch (error) {
      throw new BoomError({
        message: 'Error to sign code',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      })
    }
  }

  verifyToken(token: string): string | JwtPayload {
    try {
      if (!this.jwtKey) {
        throw new BoomError({
          message: 'Error to read key',
          type: ErrorType.UNAUTHORIZED,
          statusCode: 401,
        })
      }

      return jwt.verify(token, this.jwtKey)
    } catch (error) {
      throw new BoomError({
        message: 'Error to sign code',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      })
    }
  }
}
