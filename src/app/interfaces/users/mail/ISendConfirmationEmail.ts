import User from "../../../domain/entities/Users";

export default interface ISendConfirmationEmail {
  execute(user: User): Promise<boolean>
}