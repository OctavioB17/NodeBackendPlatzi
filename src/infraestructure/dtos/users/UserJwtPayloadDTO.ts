import { UserRoles } from "../../../domain/interfaces/user/UserRoles";

export default interface UserJwtPayload {
  id: string;

  role: keyof UserRoles
}
