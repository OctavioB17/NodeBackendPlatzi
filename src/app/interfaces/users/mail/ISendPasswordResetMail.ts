import User from "../../../../domain/entities/Users";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

export default interface ISendPasswordResetMail {
  execute(user: UserNoPasswordDTO, token: string): Promise<boolean>
}