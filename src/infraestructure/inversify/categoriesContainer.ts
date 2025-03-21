import { Container } from "inversify";
import { CATEGORY_TYPES, UTIL_TYPES } from "../../types";
import { ICategoriesRepository } from "../../domain/repositories/ICategoryRepository";
import CategoriesRepository from "../repositories/CategoriesRepository";
import ICategoriesController from "../../presentation/controllers/interfaces/ICategoriesController";
import CategoriesController from "../../presentation/controllers/CategoriesController";
import CreateCategory from "../../app/use-cases/categories/post/CreateCategory";
import ICreateCategory from "../../app/interfaces/categories/post/ICreateCategory";
import DeleteCategory from "../../app/use-cases/categories/delete/DeleteCategory";
import IDeleteCategory from "../../app/interfaces/categories/delete/IDeleteCategory";
import IGetAllCategories from "../../app/interfaces/categories/get/IGetAllCategories";
import GetAllCategories from "../../app/use-cases/categories/get/GetAllCategories";
import IGetCategoryById from "../../app/interfaces/categories/get/IGetCategoryById";
import GetCategoryById from "../../app/use-cases/categories/get/GetCategoryById";
import UpdateCategory from "../../app/use-cases/categories/patch/UpdateCategory";
import IUpdateCategory from "../../app/interfaces/categories/patch/IUpdateCategory";
import { IIdGenerator } from "../../domain/services/utils/IIdGenerator";
import UuidGenerator from "../services/utils/UuidGenerator";

const categoriesContainer = new Container();

categoriesContainer.bind<ICategoriesRepository>(CATEGORY_TYPES.ICategoriesRepository).to(CategoriesRepository);
categoriesContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);
categoriesContainer.bind<ICategoriesController>(CATEGORY_TYPES.ICategoriesController).to(CategoriesController);
categoriesContainer.bind<ICreateCategory>(CATEGORY_TYPES.ICreateCategory).to(CreateCategory);
categoriesContainer.bind<IDeleteCategory>(CATEGORY_TYPES.IDeleteCategory).to(DeleteCategory);
categoriesContainer.bind<IGetAllCategories>(CATEGORY_TYPES.IGetAllCategories).to(GetAllCategories);
categoriesContainer.bind<IGetCategoryById>(CATEGORY_TYPES.IGetCategoryById).to(GetCategoryById);
categoriesContainer.bind<IUpdateCategory>(CATEGORY_TYPES.IUpdateCategory).to(UpdateCategory);

export default categoriesContainer