import { plainToInstance } from "class-transformer";
import UserModel from "../database/models/UserModel";
import UserDTO from "../dtos/users/UserDTO";
import UserNoPasswordDTO from "../dtos/users/UserNoPasswordDTO";
import { IUser } from "../../domain/interfaces/user/IUser";
import IUserMapper from "./interfaces/IUserMapper";
import User from "../../domain/entities/Users";

export default class UserMapper implements IUserMapper {

  userToDto(user: User): UserDTO {
    return plainToInstance(UserDTO, user)
  }

  userToDtoList(users: User[]): UserDTO[] {
    return users.map(user => this.userToDto(user))
  }

  dtoToUser(dto: UserDTO): User {
    return plainToInstance(User, dto)
  }

  dtoToUserList(dtos: UserDTO[]): User[] {
    return dtos.map(dto => this.dtoToUser(dto))
  }

  userToNoPasswordDTO(userModels: User): UserNoPasswordDTO {
    return plainToInstance(UserNoPasswordDTO, userModels);
  }

  userToNoPasswordDTOList(userModels: User[]): UserNoPasswordDTO[] {
    return userModels.map(user => this.userToNoPasswordDTO(user))
  }

  userToModel(user: User): UserModel {
    return plainToInstance(UserModel, user);
  }

  userToModelList(user: User[]): UserModel[] {
    return user.map(user => this.userToModel(user))
  }

  modelToUser(model: UserModel): User {
    return plainToInstance(User, model);
  }

  modelToUserList(model: UserModel[]): User[] {
    return model.map(model => this.modelToUser(model))
  }

  userModelToDTO(userModel: UserModel): UserDTO {
    return plainToInstance(UserDTO, userModel);
  }

  userModelToNoPasswordDTO(userModel: UserModel): UserNoPasswordDTO {
    return plainToInstance(UserNoPasswordDTO, userModel);
  }

  userModelToDTOList(userModels: UserModel[]): UserDTO[] {
    return userModels.map(user => this.userModelToDTO(user.dataValues))
  }

  userModelToNoPasswordDTOList(userModels: UserModel[]): UserNoPasswordDTO[] {
    return userModels.map(user => this.userModelToNoPasswordDTO(user.dataValues))
  }

  userDtoToModel(userDto: UserDTO): UserModel {
    return plainToInstance(UserModel, userDto)
  }

  userDtoToModelList(userDtos: UserDTO[]): UserModel[] {
    return userDtos.map(user => this.userDtoToModel(user))
  }

  iUserDtoToModel(iUser: IUser): UserModel {
    return plainToInstance(UserModel, iUser)
  }

  iUserDtoToModelList(iUsers: IUser[]): UserModel[] {
    return iUsers.map(user => this.iUserDtoToModel(user))
  }
}
