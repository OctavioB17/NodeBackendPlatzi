import { plainToInstance } from "class-transformer";
import UserModel from "../database/models/UserModel";
import UserDTO from "../dtos/UserDTO";
import UserNoPasswordDTO from "../dtos/UserNoPasswordDTO";
import { IUser } from "../../domain/interfaces/user/IUser";

export default class UserMapper {
  static userModelToDTO(userModel: UserModel): UserDTO {
    return plainToInstance(UserDTO, userModel);
  }

  static userModelToNoPasswordDTO(userModel: UserModel): UserNoPasswordDTO {
    return plainToInstance(UserNoPasswordDTO, userModel);
  }

  static userModelToDTOList(userModels: UserModel[]): UserDTO[] {
    return userModels.map(user => this.userModelToDTO(user.dataValues))
  }

  static userModelToNoPasswordDTOList(userModels: UserModel[]): UserNoPasswordDTO[] {
    return userModels.map(user => this.userModelToNoPasswordDTO(user.dataValues))
  }

  static userDtoToModel(userDto: UserDTO): UserModel {
    return plainToInstance(UserModel, userDto)
  }

  static userDtoToModelList(userDtos: UserDTO[]): UserModel[] {
    return userDtos.map(user => this.userDtoToModel(user))
  }

  static iUserDtoToModel(iUser: IUser): UserModel {
    return plainToInstance(UserModel, iUser)
  }

  static iUserDtoToModelList(iUsers: IUser[]): UserModel[] {
    return iUsers.map(user => this.iUserDtoToModel(user))
  }
}
