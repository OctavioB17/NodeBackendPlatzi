import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { obtainIp } from './utils/functions';
import routerApi from './presentation/routes';
import { container } from './infraestructure/inversify/container';
import { ICreateUser } from './app/interfaces/users/post/ICreateUser';
import {USER_TYPES} from './types';
import { IIdGenerator } from './domain/services/utils/IIdGenerator';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { IFindAll } from './app/interfaces/users/get/IFindAll';
import { IFindAllNoPassword } from './app/interfaces/users/get/IFindAllNoPassword';
import { IFindUserByIdNoPassword } from './app/interfaces/users/get/IFindUserByIdNoPassword';
import { IFindUserByEmail } from './app/interfaces/users/get/IFindUserByEmail';
import { IFindUserByEmailNoPassword } from './app/interfaces/users/get/IFindUserByEmailNoPassword';
import { IDeleteUser } from './app/interfaces/users/delete/IDeleteUser';
import { IChangePassword } from './app/interfaces/users/patch/IChangePassword';
import { boomErrorHandling, errorHandlingMiddleware, logError } from './infraestructure/middlewares/httpError';
import { IUserController } from './infraestructure/controllers/interfaces/IUserController';
import syncDatabase from './infraestructure/database/DataBaseSync';

const app = express();
app.use(express.json());
syncDatabase();
const port = 3000;
const ip: string = obtainIp() || 'localhost';

container.get<ICreateUser>(USER_TYPES.ICreateUser);
container.get<IIdGenerator>(USER_TYPES.IIdGenerator);
container.get<IUserRepository>(USER_TYPES.IUserRepository);
container.get<IFindAll>(USER_TYPES.IFindAll)
container.get<IFindAllNoPassword>(USER_TYPES.IFindAllNoPassword)
container.get<IFindAllNoPassword>(USER_TYPES.IFindUserById)
container.get<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword)
container.get<IFindUserByEmail>(USER_TYPES.IFindUserByEmail)
container.get<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword)
container.get<IChangePassword>(USER_TYPES.IChangePassword)
container.get<IDeleteUser>(USER_TYPES.IDeleteUser)
container.get<IUserController>(USER_TYPES.IUserController);
routerApi(app);
app.use(logError);
app.use(boomErrorHandling);
app.use(errorHandlingMiddleware);
app.listen(port, ip, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
