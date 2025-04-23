export default interface ISendPasswordResetRequest {
  execute(email: string): Promise<boolean>
}