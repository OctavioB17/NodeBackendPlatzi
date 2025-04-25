import { Container } from "inversify";
import {AWS_TYPES, PRODUCT_TYPES, UTIL_TYPES} from "../../types";
import IProductRepository from "../../domain/repositories/IProductsRepository";
import ProductRepository from "../repositories/ProductRepository";
import FindAllProductsByUser from "../../app/use-cases/products/get/FindAllProductsByUser";
import IFindAllProductsByUser from "../../app/interfaces/products/get/IFindAllProductsByUser";
import IFindProductById from "../../app/interfaces/products/get/IFindProductById";
import FindProductById from "../../app/use-cases/products/get/FindProductById";
import IFindAllProductByCategory from "../../app/interfaces/products/get/IFindAllProductByCategory";
import FindAllProductsByCategory from "../../app/use-cases/products/get/FindAllProductsByCategory";
import IFindProductsByName from "../../app/interfaces/products/get/IFindProductByName";
import FindProductsByName from "../../app/use-cases/products/get/FindProductsByName";
import ICreateProduct from "../../app/interfaces/products/post/ICreateProduct";
import CreateProduct from "../../app/use-cases/products/post/CreateProduct";
import IDeleteProduct from "../../app/interfaces/products/delete/IDeleteProduct";
import DeleteProduct from "../../app/use-cases/products/delete/DeleteProduct";
import IUpdateProduct from "../../app/interfaces/products/patch/IUpdateProduct";
import UpdateProduct from "../../app/use-cases/products/patch/UpdateProduct";
import IUpdateStock from "../../app/interfaces/products/patch/IUpdateStock";
import UpdateStock from "../../app/use-cases/products/patch/UpdateStock";
import IToggleProductPause from "../../app/interfaces/products/patch/IToggleProductPause";
import ToggleProductPause from "../../app/use-cases/products/patch/ToggleProductPause";
import IProductController from "../../presentation/controllers/interfaces/IProductController";
import ProductController from "../../presentation/controllers/ProductController";
import { IIdGenerator } from "../services/interfaces/IIdGenerator";
import IProductMapper from "../mappers/interfaces/IProductMapper";
import ProductMapper from "../mappers/ProductMapper";
import UuidGenerator from "../services/utils/UuidGenerator";
import IChangeRole from "../../app/interfaces/users/patch/IChangeRole";
import IFindAllRandomized from "../../app/interfaces/products/get/IFindAllRandomized";
import FindAllRandomized from "../../app/use-cases/products/get/FindAllRandomized";
import IUploadProductPhoto from "../../app/interfaces/products/post/IUploadPhoto";
import UploadProductPhoto from "../../app/use-cases/products/post/UploadProductPhoto";
import IDeleteProductPhoto from "../../app/interfaces/products/delete/IDeleteProductPhoto";
import DeleteProductPhoto from "../../app/use-cases/products/delete/DeleteProductPhoto";
import IDeleteFileInS3 from "../../app/interfaces/aws/IDeleteFileInS3";
import DeleteFileInS3 from "../../app/use-cases/aws/DeleteFileInS3";
import { IAwsServices } from "../services/interfaces/IAwsServices";
import AwsServices from "../services/aws/AwsServices";
import IUploadFileToS3 from "../../app/interfaces/aws/IUploadFileToS3";
import UploadFileToS3 from "../../app/use-cases/aws/UploadFileToS3";

const productContainer = new Container();

productContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository);
productContainer.bind<IProductController>(PRODUCT_TYPES.IProductController).to(ProductController);
productContainer.bind<IProductMapper>(PRODUCT_TYPES.IProductMapper).to(ProductMapper)
productContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);
productContainer.bind<IFindAllProductsByUser>(PRODUCT_TYPES.IFindAllProductsByUser).to(FindAllProductsByUser);
productContainer.bind<IFindProductById>(PRODUCT_TYPES.IFindProductById).to(FindProductById);
productContainer.bind<IFindAllProductByCategory>(PRODUCT_TYPES.IFindAllProductByCategory).to(FindAllProductsByCategory);
productContainer.bind<IFindProductsByName>(PRODUCT_TYPES.IFindProductByName).to(FindProductsByName);
productContainer.bind<ICreateProduct>(PRODUCT_TYPES.ICreateProduct).to(CreateProduct);
productContainer.bind<IDeleteProduct>(PRODUCT_TYPES.IDeleteProduct).to(DeleteProduct);
productContainer.bind<IUpdateProduct>(PRODUCT_TYPES.IUpdateProduct).to(UpdateProduct)
productContainer.bind<IUpdateStock>(PRODUCT_TYPES.IUpdateStock).to(UpdateStock);
productContainer.bind<IToggleProductPause>(PRODUCT_TYPES.IToggleProductPause).to(ToggleProductPause)
productContainer.bind<IFindAllRandomized>(PRODUCT_TYPES.IFindAllRandomized).to(FindAllRandomized)
productContainer.bind<IUploadProductPhoto>(PRODUCT_TYPES.IUploadProductPhoto).to(UploadProductPhoto)
productContainer.bind<IDeleteProductPhoto>(PRODUCT_TYPES.IDeleteProductPhoto).to(DeleteProductPhoto)
productContainer.bind<IDeleteFileInS3>(AWS_TYPES.IDeleteFileInS3).to(DeleteFileInS3)
productContainer.bind<IUploadFileToS3>(AWS_TYPES.IUploadFileToS3).to(UploadFileToS3)
productContainer.bind<IAwsServices>(AWS_TYPES.IAwsServices).to(AwsServices)

export default productContainer
