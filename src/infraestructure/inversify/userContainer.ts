import { Container } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { ICreateUser } from "../../app/interfaces/users/post/ICreateUser";
import { USER_TYPES, UTIL_TYPES } from "../../types";
import CreateUser from "../../app/use-cases/users/post/CreateUser";
import { IFindAllUsersNoPassword } from "../../app/interfaces/users/get/IFindAllUsersNoPassword";
import { IFindUserById } from "../../app/interfaces/users/get/IFindUserById";
import { IFindUserByIdNoPassword } from "../../app/interfaces/users/get/IFindUserByIdNoPassword";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import { IFindUserByEmailNoPassword } from "../../app/interfaces/users/get/IFindUserByEmailNoPassword";
import FindAllUsers from "../../app/use-cases/users/get/FindAll";
import FindAllNoPassword from "../../app/use-cases/users/get/FindAllNoPassword";
import FindUserById from "../../app/use-cases/users/get/FindUserById";
import FindUserIdNoPassword from "../../app/use-cases/users/get/FindUserByIdNoPassword";
import FindUserByMail from "../../app/use-cases/users/get/FindUserByMail";
import { IChangePassword } from "../../app/interfaces/users/patch/IChangePassword";
import ChangePassword from "../../app/use-cases/users/patch/ChangePassword";
import { IDeleteUser } from "../../app/interfaces/users/delete/IDeleteUser";
import DeleteUser from "../../app/use-cases/users/delete/DeleteUser";
import UserController from "../../presentation/controllers/UserController";
import IUserController from "../../presentation/controllers/interfaces/IUserController";
import FindUserByMailNoPassword from "../../app/use-cases/users/get/FindUserByMailNoPassword";
import { IFindAllUsers } from "../../app/interfaces/users/get/IFindAll";
import { IIdGenerator } from "../../domain/services/utils/IIdGenerator";
import UuidGenerator from "../services/utils/UuidGenerator";

const userContainer = new Container();

userContainer.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
userContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);
userContainer.bind<ICreateUser>(USER_TYPES.ICreateUser).to(CreateUser);
userContainer.bind<IFindAllUsers>(USER_TYPES.IFindAll).to(FindAllUsers)
userContainer.bind<IFindAllUsersNoPassword>(USER_TYPES.IFindAllNoPassword).to(FindAllNoPassword)
userContainer.bind<IFindUserById>(USER_TYPES.IFindUserById).to(FindUserById)
userContainer.bind<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword).to(FindUserIdNoPassword)
userContainer.bind<IFindUserByEmail>(USER_TYPES.IFindUserByEmail).to(FindUserByMail)
userContainer.bind<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword).to(FindUserByMailNoPassword)
userContainer.bind<IChangePassword>(USER_TYPES.IChangePassword).to(ChangePassword)
userContainer.bind<IDeleteUser>(USER_TYPES.IDeleteUser).to(DeleteUser)
userContainer.bind<IUserController>(USER_TYPES.IUserController).to(UserController)

export default userContainer
