import { Transporter } from "nodemailer";

export default interface INodeMailer {
  mailTransporter(): Transporter
}