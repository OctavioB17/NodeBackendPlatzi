import { Container } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { ICreateUser } from "../../app/interfaces/users/post/ICreateUser";
import { IIdGenerator } from "../../domain/services/utils/IIdGenerator";
import {USER_TYPES} from "../../types";
import UuidGenerator from "../services/utils/UuidGenerator";
import CreateUser from "../../app/use-cases/users/post/CreateUser";
import { IFindAll } from "../../app/interfaces/users/get/IFindAll";
import { IFindAllNoPassword } from "../../app/interfaces/users/get/IFindAllNoPassword";
import { IFindUserById } from "../../app/interfaces/users/get/IFindUserById";
import { IFindUserByIdNoPassword } from "../../app/interfaces/users/get/IFindUserByIdNoPassword";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import { IFindUserByEmailNoPassword } from "../../app/interfaces/users/get/IFindUserByEmailNoPassword";
import FindAll from "../../app/use-cases/users/get/FindAll";
import FindAllNoPassword from "../../app/use-cases/users/get/FindAllNoPassword";
import FindUserById from "../../app/use-cases/users/get/FindUserById";
import FindUserIdNoPassword from "../../app/use-cases/users/get/FindUserByIdNoPassword";
import FindUserByMail from "../../app/use-cases/users/get/FindUserByMail";
import { IChangePassword } from "../../app/interfaces/users/patch/IChangePassword";
import ChangePassword from "../../app/use-cases/users/patch/ChangePassword";
import { IDeleteUser } from "../../app/interfaces/users/delete/IDeleteUser";
import DeleteUser from "../../app/use-cases/users/delete/DeleteUser";
import UserController from "../controllers/UserController";
import { IUserController } from "../controllers/interfaces/IUserController";
import FindUserByMailNoPassword from "../../app/use-cases/users/get/FindUserByMailNoPassword";

const container = new Container();

container.bind<IIdGenerator>(USER_TYPES.IIdGenerator).to(UuidGenerator);
container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
container.bind<ICreateUser>(USER_TYPES.ICreateUser).to(CreateUser);
container.bind<IFindAll>(USER_TYPES.IFindAll).to(FindAll)
container.bind<IFindAllNoPassword>(USER_TYPES.IFindAllNoPassword).to(FindAllNoPassword)
container.bind<IFindUserById>(USER_TYPES.IFindUserById).to(FindUserById)
container.bind<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword).to(FindUserIdNoPassword)
container.bind<IFindUserByEmail>(USER_TYPES.IFindUserByEmail).to(FindUserByMail)
container.bind<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword).to(FindUserByMailNoPassword)
container.bind<IChangePassword>(USER_TYPES.IChangePassword).to(ChangePassword)
container.bind<IDeleteUser>(USER_TYPES.IDeleteUser).to(DeleteUser)
container.bind<IUserController>(USER_TYPES.IUserController).to(UserController)

export { container }
