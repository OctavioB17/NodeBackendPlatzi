import { plainToInstance } from "class-transformer";
import { IUser } from "../../../domain/interfaces/user/IUser";
import UserModel from "../../database/models/UserModel";
import UserDTO from "../../dtos/UserDTO";
import UserNoPasswordDTO from "../../dtos/UserNoPasswordDTO";
import User from "../../../domain/entities/Users";

export default interface IUserMapper {

  userToDto(user: User): UserDTO

  userToDtoList(users: User[]): UserDTO[]

  dtoToUser(dto: UserDTO): User

  dtoToUserList(dto: UserDTO[]): User[]

  userModelToDTO(userModel: UserModel): UserDTO

  userModelToNoPasswordDTO(userModel: UserModel): UserNoPasswordDTO

  userToModel(user: User): UserModel

  userToModelList(user: User[]): UserModel[]

  modelToUser(model: UserModel): User

  modelToUserList(model: UserModel[]): User[]

  userModelToDTOList(userModels: UserModel[]): UserDTO[]

  userModelToNoPasswordDTOList(userModels: UserModel[]): UserNoPasswordDTO[]

  userToNoPasswordDTO(userModels: User): UserNoPasswordDTO

  userToNoPasswordDTOList(userModels: User[]): UserNoPasswordDTO[]

  userDtoToModel(userDto: UserDTO): UserModel

  userDtoToModelList(userDtos: UserDTO[]): UserModel[]

  iUserDtoToModel(iUser: IUser): UserModel

  iUserDtoToModel(iUser: IUser): UserModel

  iUserDtoToModelList(iUsers: IUser[]): UserModel[]
}
