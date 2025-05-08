export default interface IRenewAccessToken {
  execute(refreshToken: string, expirationTime: string): Promise<string>
}