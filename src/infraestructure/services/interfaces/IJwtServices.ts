import { JwtPayload } from "jsonwebtoken"
import UserJwtPayload from "../../dtos/users/UserJwtPayloadDTO"

export default interface IJwtServices {
  signToken(payload: UserJwtPayload): string

  verifyToken(token: string): string | JwtPayload
}

