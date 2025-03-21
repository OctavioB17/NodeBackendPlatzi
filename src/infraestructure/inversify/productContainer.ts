import { Container } from "inversify";
import {PRODUCT_TYPES, UTIL_TYPES} from "../../types";
import IProductRepository from "../../domain/repositories/IProductRepository";
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
import { IIdGenerator } from "../../domain/services/utils/IIdGenerator";
import UuidGenerator from "../services/utils/UuidGenerator";

const productContainer = new Container();

productContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository);
productContainer.bind<IProductController>(PRODUCT_TYPES.IProductController).to(ProductController);
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

export default productContainer
