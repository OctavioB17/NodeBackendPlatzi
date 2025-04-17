export default interface ILocalLogin {
  login(email: string, password: string): Promise<string>;
}