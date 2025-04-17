import User from "../../../domain/entities/Users";

export default interface ISignToken {
  sign(user: User): string
}