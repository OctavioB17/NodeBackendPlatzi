import { TypeMapper } from "ts-mapper"
import { IUserModel } from "../../domain/interfaces/user/IUserModel";
import { IUser } from "../../domain/interfaces/user/IUser";
import { UserNoPasswordDTO } from "../../app/dtos/UserDTO";
import User from "../../domain/entities/User";

export class UserMapper extends TypeMapper {
  constructor() {
    super();
    this.config()
  }

  private config(): void {
    this.createMap<IUser, IUserModel>()
      .map(src => src.id, dest => dest.id)
      .map(src => src.name, dest => dest.name)
      .map(src => src.surname, dest => dest.surname)
      .map(src => src.password, dest => dest.password)
      .map(src => src.email, dest => dest.email);

    this.createMap<IUserModel, IUser>()
      .map(src => src.id, dest => dest.id)
      .map(src => src.name, dest => dest.name)
      .map(src => src.surname, dest => dest.surname)
      .map(src => src.password, dest => dest.password)
      .map(src => src.email, dest => dest.email);

    this.createMap<IUser, UserNoPasswordDTO>()
      .map(src => src.name, dest => dest.name)
      .map(src => src.surname, dest => dest.surname)
      .map(src => src.email, dest => dest.email);

    this.createMap<IUserModel, UserNoPasswordDTO>()
      .map(src => src.name, dest => dest.name)
      .map(src => src.surname, dest => dest.surname)
      .map(src => src.email, dest => dest.email);

    this.createMap<User, IUser>()
      .map(src => src.getId(), dest => dest.id)
      .map(src => src.getName(), dest => dest.name)
      .map(src => src.getSurname(), dest => dest.surname)
      .map(src => src.getEmail(), dest => dest.email);
  }
}

export const userMapper = new UserMapper();
