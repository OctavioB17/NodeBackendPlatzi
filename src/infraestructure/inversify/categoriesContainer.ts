import { Container } from "inversify";
import { AWS_TYPES, CATEGORY_TYPES, PRODUCT_TYPES, UTIL_TYPES } from "../../types";
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
import { IIdGenerator } from "../services/interfaces/IIdGenerator";
import IGetCategoryByName from "../../app/interfaces/categories/get/IGetCategoryByName";
import GetCategoryByName from "../../app/use-cases/categories/get/GetCategoryByName";
import ICategoryMapper from "../mappers/interfaces/ICategoriesMapper";
import CategoryMapper from "../mappers/CategoriesMapper";
import UuidGenerator from "../services/utils/UuidGenerator";
import IFindAllProductByCategory from "../../app/interfaces/products/get/IFindAllProductByCategory";
import FindAllProductsByCategory from "../../app/use-cases/products/get/FindAllProductsByCategory";
import IDeleteProduct from "../../app/interfaces/products/delete/IDeleteProduct";
import IProductRepository from "../../domain/repositories/IProductsRepository";
import ProductRepository from "../repositories/ProductRepository";
import IProductMapper from "../mappers/interfaces/IProductMapper";
import ProductMapper from "../mappers/ProductMapper";
import DeleteProduct from "../../app/use-cases/products/delete/DeleteProduct";
import DeleteProductFolder from "../../app/use-cases/aws/DeleteProductFolder";
import { IDeleteProductFolder } from "../../app/interfaces/aws/IDeleteProductFolder";
import { IAwsServices } from "../services/interfaces/IAwsServices";
import AwsServices from "../services/aws/AwsServices";
import DeleteFolderInS3 from "../../app/use-cases/aws/DeleteFolderInS3";
import IDeleteFolderInS3 from "../../app/interfaces/aws/IDeleteFolderInS3";
import IUploadFileToS3 from "../../app/interfaces/aws/IUploadFileToS3";
import UploadFileToS3 from "../../app/use-cases/aws/UploadFileToS3";
import ICreateFolderInS3 from "../../app/interfaces/aws/ICreateFolderInS3";
import CreateFolderInS3 from "../../app/use-cases/aws/CreateFolderInS3";
import IChangeImageFormat from "../../app/interfaces/utils/images/IChangeImageFormat";
import ChangeImageFormat from "../../app/use-cases/utils/images/ChangeImageFormat";
import IImageManipulation from "../services/interfaces/IImageManipulation";
import ImageManipulation from "../services/utils/ImageManipulation";

const categoriesContainer = new Container();

categoriesContainer.bind<ICategoriesRepository>(CATEGORY_TYPES.ICategoriesRepository).to(CategoriesRepository);
categoriesContainer.bind<ICategoryMapper>(CATEGORY_TYPES.ICategoryMapper).to(CategoryMapper)
categoriesContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);
categoriesContainer.bind<ICategoriesController>(CATEGORY_TYPES.ICategoriesController).to(CategoriesController);
categoriesContainer.bind<ICreateCategory>(CATEGORY_TYPES.ICreateCategory).to(CreateCategory);
categoriesContainer.bind<IDeleteCategory>(CATEGORY_TYPES.IDeleteCategory).to(DeleteCategory);
categoriesContainer.bind<IGetAllCategories>(CATEGORY_TYPES.IGetAllCategories).to(GetAllCategories);
categoriesContainer.bind<IGetCategoryById>(CATEGORY_TYPES.IGetCategoryById).to(GetCategoryById);
categoriesContainer.bind<IUpdateCategory>(CATEGORY_TYPES.IUpdateCategory).to(UpdateCategory);
categoriesContainer.bind<IGetCategoryByName>(CATEGORY_TYPES.IGetCategoryByName).to(GetCategoryByName);
categoriesContainer.bind<IFindAllProductByCategory>(PRODUCT_TYPES.IFindAllProductByCategory).to(FindAllProductsByCategory);
categoriesContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository);
categoriesContainer.bind<IDeleteFolderInS3>(AWS_TYPES.IDeleteFolderInS3).to(DeleteFolderInS3)
categoriesContainer.bind<ICreateFolderInS3>(AWS_TYPES.ICreateFolderInS3).to(CreateFolderInS3)
categoriesContainer.bind<IUploadFileToS3>(AWS_TYPES.IUploadFileToS3).to(UploadFileToS3)
categoriesContainer.bind<IProductMapper>(PRODUCT_TYPES.IProductMapper).to(ProductMapper);
categoriesContainer.bind<IDeleteProduct>(PRODUCT_TYPES.IDeleteProduct).to(DeleteProduct);
categoriesContainer.bind<IDeleteProductFolder>(PRODUCT_TYPES.IDeleteProductFolder).to(DeleteProductFolder);
categoriesContainer.bind<IAwsServices>(AWS_TYPES.IAwsServices).to(AwsServices);
categoriesContainer.bind<IImageManipulation>(UTIL_TYPES.IImageManipulation).to(ImageManipulation);
categoriesContainer.bind<IChangeImageFormat>(UTIL_TYPES.IChangeImageFormat).to(ChangeImageFormat);


export default categoriesContainer
