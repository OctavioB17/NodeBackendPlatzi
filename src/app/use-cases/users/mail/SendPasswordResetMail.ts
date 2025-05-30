  import { inject, injectable } from "inversify";
  import { MAIL_TYPES } from "../../../../types";
  import { BoomError } from "../../../../domain/entities/DomainError";
  import { ErrorType } from "../../../../domain/interfaces/Error";
  import { fileURLToPath } from 'url';
  import path from 'path';
  import fs from 'fs'
  import Handlebars from "handlebars";
  import ISendMail from "../../../interfaces/mail/ISendMail";
  import ISendPasswordResetMail from "../../../interfaces/users/mail/ISendPasswordResetMail";
  import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

  @injectable()
  export default class SendPasswordResetMail implements ISendPasswordResetMail {
    private sendMail: ISendMail

    constructor(@inject(MAIL_TYPES.ISendMail) sendMail: ISendMail) {
      this.sendMail = sendMail
    }

    async execute(user: UserNoPasswordDTO, token: string): Promise<boolean> {
      try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.join(__dirname, "../../../../presentation/templates/PasswordResetRequestEmail.html");
        const htmlTemplate = fs.readFileSync(filePath, "utf-8");

        const template = Handlebars.compile(htmlTemplate);

        const htmlToSend = template({
          name: user.name,
          surname: user.surname,
          userId: user.id,
          token: token
        });

        const mailSend = await this.sendMail.execute(user.email, 'Password reset', '', htmlToSend);

        return !!mailSend
      } catch (error) {
        if (error instanceof BoomError) {
          throw error;
        }

        throw new BoomError({
          message: 'Failed to send password reset mail',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
      }
    }
  }