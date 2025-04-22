export default interface INodeMailerServices {
  sendMail(to: string | string[], subject: string, text?: string, html?: string): Promise<string>
}