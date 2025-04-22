import { UserRolesEnum } from "../../../../domain/interfaces/user/UserRoles";

export default interface IChangeRole {
  execute(id: string, newRole: keyof typeof UserRolesEnum): Promise<boolean>
}