import { Container } from "inversify";
import {PRODUCT_TYPES} from "../../types";
import IProductRepository from "../../domain/repositories/IProductRepository";
import ProductRepository from "../repositories/ProductRepository";
import FindAllProductsByUser from "../../app/use-cases/products/get/FindAllProductsByUser";
import IFindAllProductsByUser from "../../app/interfaces/products/get/IFindAllProductsByUser";
import IFindProductById from "../../app/interfaces/products/get/IFindProductByID";
import FindProductById from "../../app/use-cases/products/get/FindProductById";
import IFindAllProductByCategory from "../../app/interfaces/products/get/IFindAllProductByCategory";
import FindAllProductsByCategory from "../../app/use-cases/products/get/FindAllProductsByCategory";
import IFindProductsByName from "../../app/interfaces/products/get/IFindProductByName";
import FindProductsByName from "../../app/use-cases/products/get/FindProductsByName";

const productContainer = new Container();

productContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository);
productContainer.bind<IFindAllProductsByUser>(PRODUCT_TYPES.IFindAllProductsByUser).to(FindAllProductsByUser);
productContainer.bind<IFindProductById>(PRODUCT_TYPES.IFindProductById).to(FindProductById)
productContainer.bind<IFindAllProductByCategory>(PRODUCT_TYPES.IFindAllProductByCategory).to(FindAllProductsByCategory)
productContainer.bind<IFindProductsByName>(PRODUCT_TYPES.IFindProductByName).to(FindProductsByName)

export { productContainer }
