import { config } from "dotenv"
import { BoomError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from "inversify";
import INodeMailer from "./interfaces/INodeMailer";

config()

@injectable()
export default class NodeMailer implements INodeMailer {
  private readonly GOOGLE_APP_PASS: string | undefined;
  private readonly GOOGLE_APP_MAIL: string | undefined

  constructor () {
    this.GOOGLE_APP_MAIL = process.env.GOOGLE_APP_MAIL;
    this.GOOGLE_APP_PASS = process.env.GOOGLE_APP_PASS;
  }

  mailTransporter(): Transporter {
    try {
      const nodeMailerTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: this.GOOGLE_APP_MAIL,
          pass: this.GOOGLE_APP_PASS
        }
      })

      return nodeMailerTransporter
    } catch (error) {
      throw new BoomError({
        message: 'Error to set up mail engine',
        statusCode: 500,
        type: ErrorType.INTERNAL_ERROR,
      })
    }
  }
}