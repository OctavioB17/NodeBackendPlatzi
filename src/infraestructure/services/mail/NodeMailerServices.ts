import { inject, injectable } from "inversify";
import INodeMailerServices from "../interfaces/INodeMailerServices";
import INodeMailer from "../../config/interfaces/INodeMailer";
import { MAIL_TYPES } from "../../../types";
import { config } from "dotenv";
import { BoomError } from "../../../domain/entities/DomainError";
import { ErrorType } from "../../../domain/interfaces/Error";
config()

@injectable()
export default class NodeMailerServices implements INodeMailerServices {
  private nodeMailer: INodeMailer
  private GOOGLE_APP_MAIL: string | undefined

  constructor(@inject(MAIL_TYPES.INodeMailer) nodeMailer: INodeMailer) {
    this.nodeMailer = nodeMailer
    this.GOOGLE_APP_MAIL = process.env.GOOGLE_APP_MAIL
  }

  async sendMail(to: string | string[], subject: string, text?: string, html?: string): Promise<string> {
    try {
      const mail = await this.nodeMailer.mailTransporter().sendMail({
        from: `"Maria Pinina Store" <${this.GOOGLE_APP_MAIL}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
      })
      return mail.response
    } catch (error) {
      throw new BoomError({
        message: 'Failed to send mail',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      })
    }
  }

}