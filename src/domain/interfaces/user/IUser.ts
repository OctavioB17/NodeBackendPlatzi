export interface IUser {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
  password: string;
}

export interface UserNoPassword {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
}