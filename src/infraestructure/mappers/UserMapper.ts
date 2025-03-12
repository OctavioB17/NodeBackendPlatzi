import { plainToInstance } from "class-transformer";
import { UserModel } from "../database/models/UserModel";
import UserDTO from "../dtos/UserDTO";
import UserNoPasswordDTO from "../dtos/UserNoPasswordDTO";

export default class UserMapper {
  static toDTO(userModel: UserModel): UserDTO {
    return plainToInstance(UserDTO, userModel);
  }

  static toNoPasswordDTO(userModel: UserModel): UserNoPasswordDTO {
    return plainToInstance(UserNoPasswordDTO, userModel);
  }

  static toDTOList(userModels: UserModel[]): UserDTO[] {
    return userModels.map(user => this.toDTO(user.dataValues))
  }

  static toNoPasswordDTOList(userModels: UserModel[]): UserDTO[] {
    return userModels.map(user => this.toDTO(user.dataValues))
  }
}
