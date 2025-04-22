import { Container } from "inversify";
import INodeMailer from "../config/interfaces/INodeMailer";
import { MAIL_TYPES } from "../../types";
import NodeMailer from "../config/NodeMailer";
import INodeMailerServices from "../services/interfaces/INodeMailerServices";
import NodeMailerServices from "../services/mail/NodeMailerServices";
import SendConfirmationEmail from "../../app/use-cases/users/SendConfirmationEmail";
import ISendConfirmationEmail from "../../app/interfaces/users/ISendConfirmationEmail";
import ISendMail from "../../app/interfaces/mail/ISendMail";
import SendMail from "../../app/use-cases/mail/SendMail";

const emailContainer = new Container();

emailContainer.bind<INodeMailer>(MAIL_TYPES.INodeMailer).to(NodeMailer)
emailContainer.bind<INodeMailerServices>(MAIL_TYPES.INodeMailerServices).to(NodeMailerServices)
emailContainer.bind<ISendConfirmationEmail>(MAIL_TYPES.ISendConfirmationEmail).to(SendConfirmationEmail)
emailContainer.bind<ISendMail>(MAIL_TYPES.ISendMail).to(SendMail)


export default emailContainer