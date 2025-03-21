import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { obtainIp } from './utils/functions';
import routerApi from './presentation/routes';
import { ICreateUser } from './app/interfaces/users/post/ICreateUser';
import {CATEGORY_TYPES, PRODUCT_TYPES, USER_TYPES, UTIL_TYPES} from './types';
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
import IUserController from './presentation/controllers/interfaces/IUserController';
import syncDatabase from './infraestructure/database/DataBaseSync';
import { corsConfig } from './infraestructure/server/corsConfig';
import userContainer from './infraestructure/inversify/userContainer';
import productContainer from './infraestructure/inversify/productContainer';
import ICreateProduct from './app/interfaces/products/post/ICreateProduct';
import IProductRepository from './domain/repositories/IProductRepository';
import IProductController from './presentation/controllers/interfaces/IUserController'
import IFindAllProductByCategory from './app/interfaces/products/get/IFindAllProductByCategory';
import IFindAllProductsByUser from './app/interfaces/products/get/IFindAllProductsByUser';
import IFindProductById from './app/interfaces/products/get/IFindProductById';
import IFindProductByName from './app/interfaces/products/get/IFindProductByName';
import IToggleProductPause from './app/interfaces/products/patch/IToggleProductPause';
import IUpdateProduct from './app/interfaces/products/patch/IUpdateProduct';
import categoriesContainer from './infraestructure/inversify/categoriesContainer';
import { ICategoriesRepository } from './domain/repositories/ICategoryRepository';
import ICategoriesController from './presentation/controllers/interfaces/ICategoriesController';
import IDeleteCategory from './app/interfaces/categories/delete/IDeleteCategory';
import IGetAllCategories from './app/interfaces/categories/get/IGetAllCategories';
import IGetCategoryById from './app/interfaces/categories/get/IGetCategoryById';
import IUpdateCategory from './app/interfaces/categories/patch/IUpdateCategory';
import ICreateCategory from './app/interfaces/categories/post/ICreateCategory';
import utilContainer from './infraestructure/inversify/utilContainer';

const app = express();
app.use(express.json());
app.use(corsConfig)
syncDatabase();
const port = 3000;
const ip: string = obtainIp() || 'localhost';
utilContainer.get<IIdGenerator>(UTIL_TYPES.IIdGenerator);
userContainer.get<ICreateUser>(USER_TYPES.ICreateUser);
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
productContainer.get<IProductRepository>(PRODUCT_TYPES.IProductRepository)
productContainer.get<IProductController>(PRODUCT_TYPES.IProductController)
productContainer.get<ICreateProduct>(PRODUCT_TYPES.ICreateProduct)
productContainer.get<IFindAllProductByCategory>(PRODUCT_TYPES.IFindAllProductByCategory)
productContainer.get<IFindAllProductsByUser>(PRODUCT_TYPES.IFindAllProductsByUser)
productContainer.get<IFindProductById>(PRODUCT_TYPES.IFindProductById)
productContainer.get<IFindProductByName>(PRODUCT_TYPES.IFindProductByName)
productContainer.get<IToggleProductPause>(PRODUCT_TYPES.IToggleProductPause)
productContainer.get<IUpdateProduct>(PRODUCT_TYPES.IUpdateProduct)
categoriesContainer.get<ICategoriesRepository>(CATEGORY_TYPES.ICategoriesRepository)
categoriesContainer.get<ICategoriesController>(CATEGORY_TYPES.ICategoriesController)
categoriesContainer.get<ICreateCategory>(CATEGORY_TYPES.ICreateCategory)
categoriesContainer.get<IDeleteCategory>(CATEGORY_TYPES.IDeleteCategory)
categoriesContainer.get<IGetAllCategories>(CATEGORY_TYPES.IGetAllCategories)
categoriesContainer.get<IGetCategoryById>(CATEGORY_TYPES.IGetCategoryById)
categoriesContainer.get<IUpdateCategory>(CATEGORY_TYPES.IUpdateCategory)

routerApi(app);
app.use(logError);
app.use(boomErrorHandling);
app.use(errorHandlingMiddleware);
app.listen(port, ip, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
