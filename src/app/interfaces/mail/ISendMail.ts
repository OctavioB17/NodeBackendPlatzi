export default interface ISendMail {
  execute(to: string | string[], subject: string, text?: string, html?: string): Promise<string>
}