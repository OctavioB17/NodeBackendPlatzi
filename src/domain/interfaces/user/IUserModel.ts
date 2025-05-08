export interface IUserModel {
  id: string;
  name: string;
  surname: string,
  email: string;
  role: string;
  authorized: boolean
  refreshToken: string | null
  password: string;
}