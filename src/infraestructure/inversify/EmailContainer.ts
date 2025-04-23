import { Container } from "inversify";
import INodeMailer from "../config/interfaces/INodeMailer";
import { MAIL_TYPES } from "../../types";
import NodeMailer from "../config/NodeMailer";
import INodeMailerServices from "../services/interfaces/INodeMailerServices";
import NodeMailerServices from "../services/mail/NodeMailerServices";
import SendConfirmationEmail from "../../app/use-cases/users/mail/SendConfirmationEmail";
import ISendMail from "../../app/interfaces/mail/ISendMail";
import SendMail from "../../app/use-cases/mail/SendMail";
import ISendConfirmationEmail from "../../app/interfaces/users/mail/ISendConfirmationEmail";
import ISendPasswordResetMail from "../../app/interfaces/users/mail/ISendPasswordResetMail";
import SendPasswordResetMail from "../../app/use-cases/users/mail/SendPasswordResetMail";

const emailContainer = new Container();

emailContainer.bind<INodeMailer>(MAIL_TYPES.INodeMailer).to(NodeMailer)
emailContainer.bind<INodeMailerServices>(MAIL_TYPES.INodeMailerServices).to(NodeMailerServices)
emailContainer.bind<ISendConfirmationEmail>(MAIL_TYPES.ISendConfirmationEmail).to(SendConfirmationEmail)
emailContainer.bind<ISendMail>(MAIL_TYPES.ISendMail).to(SendMail)
emailContainer.bind<ISendPasswordResetMail>(MAIL_TYPES.ISendPasswordResetMail).to(SendPasswordResetMail)

export default emailContainer
