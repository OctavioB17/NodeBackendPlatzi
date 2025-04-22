import { Exclude, Expose } from "class-transformer";

export default class UserNoPasswordDTO {
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

  @Exclude()
  authorized!: boolean

  @Exclude()
  password!: string
}
