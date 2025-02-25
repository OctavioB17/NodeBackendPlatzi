import { Container } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { ICreateUser } from "../../app/interfaces/users/ICreateUser";
import CreateUser from "../../app/use-cases/users/CreateUser";
import UserController from "../controllers/UserController";

const container = new Container();

container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<ICreateUser>("ICreateUser").to(CreateUser);
container.bind<UserController>(UserController).toSelf()

export { container }
