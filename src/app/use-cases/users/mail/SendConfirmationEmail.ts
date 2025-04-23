import { inject, injectable } from "inversify";
import User from "../../../../domain/entities/Users";
import { MAIL_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'
import Handlebars from "handlebars";
import ISendMail from "../../../interfaces/mail/ISendMail";
import ISendConfirmationEmail from "../../../interfaces/users/mail/ISendConfirmationEmail";

@injectable()
export default class SendConfirmationEmail implements ISendConfirmationEmail {
  private sendMail: ISendMail

  constructor(@inject(MAIL_TYPES.ISendMail) sendMail: ISendMail) {
    this.sendMail = sendMail
  }

  async execute(user: User): Promise<boolean> {
    try {

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const filePath = path.join(__dirname, "../../../presentation/templates/AuthorizeUserEmail.html");
      const htmlTemplate = fs.readFileSync(filePath, "utf-8");

      const template = Handlebars.compile(htmlTemplate);

      const htmlToSend = template({
        name: user.getName(),
        surname: user.getSurname(),
        userId: user.getId(),
      });

      const mailSend = await this.sendMail.execute(user.getEmail(), 'User confirmation', '', htmlToSend);

      return !!mailSend
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: 'Failed to send confirmation mail',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
