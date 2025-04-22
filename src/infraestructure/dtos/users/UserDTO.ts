import { Expose } from "class-transformer";

export default class UserDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  surname!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: string

  @Expose()
  authorized!: boolean

  @Expose()
  password?: string
}
