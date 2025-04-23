import { inject, injectable } from "inversify";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ISendPasswordResetRequest from "../../../interfaces/users/ISendPasswordResetRequest";
import { AUTH_TYPES, MAIL_TYPES, USER_TYPES } from "../../../../types";
import ISendPasswordResetMail from "../../../interfaces/users/mail/ISendPasswordResetMail";
import { IFindUserByEmailNoPassword } from "../../../interfaces/users/get/IFindUserByEmailNoPassword";
import IJwtServices from "../../../../infraestructure/services/interfaces/IJwtServices";
import { UserRoles } from "../../../../domain/interfaces/user/UserRoles";

@injectable()
export default class SendPasswordResetRequest implements ISendPasswordResetRequest {

  private sendPassResetMail: ISendPasswordResetMail
  private findUserByMail: IFindUserByEmailNoPassword
  private jwtServices: IJwtServices

  constructor(
    @inject(MAIL_TYPES.ISendPasswordResetMail) sendPassResetMail: ISendPasswordResetMail,
    @inject(USER_TYPES.IFindUserByEmailNoPassword) findUserByMail: IFindUserByEmailNoPassword,
    @inject(AUTH_TYPES.IJwtServices) jwtServices: IJwtServices,
  ) {
    this.sendPassResetMail = sendPassResetMail,
    this.findUserByMail = findUserByMail,
    this.jwtServices = jwtServices
  }

  async execute(email: string): Promise<boolean> {
    try {
      const user = await this.findUserByMail.execute(email)
      if (!user) {
        throw new BoomError({
          message: `User not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }
      const token = this.jwtServices.signToken({ id: user.id, role: user.role as keyof UserRoles})
      const emailSend = this.sendPassResetMail.execute(user, token)

      return !!emailSend
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `Error to request password change`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}