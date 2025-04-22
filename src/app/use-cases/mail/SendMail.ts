import { inject, injectable } from "inversify";
import ISendMail from "../../interfaces/mail/ISendMail";
import INodeMailerServices from "../../../infraestructure/services/interfaces/INodeMailerServices";
import { MAIL_TYPES } from "../../../types";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";

@injectable()
export default class SendMail implements ISendMail {
  private nodeMailerServices: INodeMailerServices

  constructor(@inject(MAIL_TYPES.INodeMailerServices) nodeMailerServices: INodeMailerServices ) {
    this.nodeMailerServices = nodeMailerServices
  }

  async execute(to: string | string[], subject: string, text?: string, html?: string): Promise<string>  {
    try {
      const mail = await this.nodeMailerServices.sendMail(to, subject, text, html)

      return mail
    } catch (error) {
      throw new BoomError({
        message: 'Error to send mail',
        statusCode: 500,
        type: ErrorType.INTERNAL_ERROR
      })
    }
  }

}
