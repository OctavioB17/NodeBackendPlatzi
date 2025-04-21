import { UserRoles } from "../../../domain/interfaces/user/UserRoles";

export default interface UserJwtPayload {
  id: keyof UserRoles;

  role: string
}
