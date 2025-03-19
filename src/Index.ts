import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { obtainIp } from './utils/functions';
import routerApi from './presentation/routes';
import { ICreateUser } from './app/interfaces/users/post/ICreateUser';
import {USER_TYPES} from './types';
import { IIdGenerator } from './domain/services/utils/IIdGenerator';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { IFindAllUsers } from './app/interfaces/users/get/IFindAll';
import { IFindAllUsersNoPassword } from './app/interfaces/users/get/IFindAllUsersNoPassword';
import { IFindUserByIdNoPassword } from './app/interfaces/users/get/IFindUserByIdNoPassword';
import { IFindUserByEmail } from './app/interfaces/users/get/IFindUserByEmail';
import { IFindUserByEmailNoPassword } from './app/interfaces/users/get/IFindUserByEmailNoPassword';
import { IDeleteUser } from './app/interfaces/users/delete/IDeleteUser';
import { IChangePassword } from './app/interfaces/users/patch/IChangePassword';
import { boomErrorHandling, errorHandlingMiddleware, logError } from './infraestructure/middlewares/httpError';
import { IUserController } from './infraestructure/controllers/interfaces/IUserController';
import syncDatabase from './infraestructure/database/DataBaseSync';
import { corsConfig } from './infraestructure/server/corsConfig';
import { userContainer } from './infraestructure/inversify/userContainer';

const app = express();
app.use(express.json());
app.use(corsConfig)
syncDatabase();
const port = 3000;
const ip: string = obtainIp() || 'localhost';
userContainer.get<ICreateUser>(USER_TYPES.ICreateUser);
userContainer.get<IIdGenerator>(USER_TYPES.IIdGenerator);
userContainer.get<IUserRepository>(USER_TYPES.IUserRepository);
userContainer.get<IFindAllUsers>(USER_TYPES.IFindAll)
userContainer.get<IFindAllUsersNoPassword>(USER_TYPES.IFindAllNoPassword)
userContainer.get<IFindAllUsersNoPassword>(USER_TYPES.IFindUserById)
userContainer.get<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword)
userContainer.get<IFindUserByEmail>(USER_TYPES.IFindUserByEmail)
userContainer.get<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword)
userContainer.get<IChangePassword>(USER_TYPES.IChangePassword)
userContainer.get<IDeleteUser>(USER_TYPES.IDeleteUser)
userContainer.get<IUserController>(USER_TYPES.IUserController);
routerApi(app);
app.use(logError);
app.use(boomErrorHandling);
app.use(errorHandlingMiddleware);
app.listen(port, ip, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
