export default interface ILocalLogin {
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
}