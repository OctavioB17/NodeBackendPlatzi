import User from "../../../../domain/entities/Users";

export default interface IAuthorizeUser {
  execute(userId: string): Promise<boolean>
}