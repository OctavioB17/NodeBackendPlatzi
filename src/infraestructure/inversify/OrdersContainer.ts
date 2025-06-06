import { Container } from "inversify";
import IOrdersMapper from "../mappers/interfaces/IOrdersMapper";
import { ORDER_TYPES, PRODUCT_TYPES, USER_TYPES, UTIL_TYPES } from "../../types";
import OrdersMapper from "../mappers/OrdersMapper";
import IFindOrderById from "../../app/interfaces/orders/get/IFindOrderById";
import ICreateOrder from "../../app/interfaces/orders/post/ICreateOrder";
import IDeleteOrder from "../../app/interfaces/orders/delete/IDeleteOrder";
import IUpdateOrder from "../../app/interfaces/orders/patch/IUpdateOrder";
import IFindAllOrdersByUserId from "../../app/interfaces/orders/get/IFindAllOrdersByUserId";
import IUpdateStatus from "../../app/interfaces/orders/patch/IUpdateStatus";
import FindOrderById from "../../app/use-cases/orders/get/FindOrderById";
import CreateOrder from "../../app/use-cases/orders/post/CreateOrder";
import DeleteOrders from "../../app/use-cases/orders/delete/DeleteOrders";
import UpdateOrder from "../../app/use-cases/orders/patch/UpdateOrder";
import FindAllOrdersByUserId from "../../app/use-cases/orders/get/FindAllOrdersByUserId";
import UpdateStatus from "../../app/use-cases/orders/patch/UpdateStatus";
import IOrdersControllers from "../../presentation/controllers/interfaces/IOrdersController";
import OrdersController from "../../presentation/controllers/OrdersController";
import IOrdersRepository from "../../domain/repositories/IOrdersRepository";
import OrderRepository from "../repositories/OrderRepository";
import { IIdGenerator } from "../services/interfaces/IIdGenerator";
import IAddProductsToOrder from "../../app/interfaces/orders/post/IAddProductsToOrder";
import AddProductsToOrders from "../../app/use-cases/orders/post/AddProductsToOrder";
import IUserMapper from "../mappers/interfaces/IUserMapper";
import UserMapper from "../mappers/UserMapper";
import IProductMapper from "../mappers/interfaces/IProductMapper";
import ProductMapper from "../mappers/ProductMapper";
import IDeleteItemInOrder from "../../app/interfaces/orders/delete/IDeleteItemInOrder";
import DeleteItemInOrder from "../../app/use-cases/orders/delete/DeleteItemInOrder";
import IModifyQuantityInOrder from "../../app/interfaces/orders/patch/IModifyQuantityInOrder";
import ModifyQuantityInOrder from "../../app/use-cases/orders/post/ModifyQuantityInOrder";
import { ITaxCalculator } from "../../app/interfaces/orders/ITaxCalculator";
import { IAddTaxesObject } from "../../app/interfaces/orders/IAddTaxObject";
import CalculateTotalProductPrices from "../../app/use-cases/orders/CalculateTotalProductPrices";
import ICalculateTotalProductPrices from "../../app/interfaces/orders/ICalculateTotalProductPrices";
import IFindProductById from "../../app/interfaces/products/get/IFindProductById";
import FindProductById from "../../app/use-cases/products/get/FindProductById";
import IProductRepository from "../../domain/repositories/IProductsRepository";
import ProductRepository from "../repositories/ProductRepository";
import AddTaxesObject from "../../app/use-cases/orders/AddTaxesObject";
import CalculatedAllTaxes from "../../app/use-cases/orders/CalculateAllTaxes";
import IvaCalculator from "../../app/use-cases/orders/IvaCalculator";
import SaleTaxCalculator from "../../app/use-cases/orders/SaleTaxCalculator";
import SpecificProductTaxCalculator from "../../app/use-cases/orders/SpecificProductTaxCalculator";
import UuidGenerator from "../services/utils/UuidGenerator";
import UpdateStock from "../../app/use-cases/products/patch/UpdateStock";
import IUpdateStock from "../../app/interfaces/products/patch/IUpdateStock";
import FindAllOrders from "../../app/use-cases/orders/get/FindAllOrders";
import IFindAllOrders from "../../app/interfaces/orders/get/IFindAllOrders";

const ordersContainer = new Container();

ordersContainer.bind<IOrdersRepository>(ORDER_TYPES.IOrdersRepository).to(OrderRepository)
ordersContainer.bind<IOrdersMapper>(ORDER_TYPES.IOrdersMapper).to(OrdersMapper)
ordersContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator)
ordersContainer.bind<IFindOrderById>(ORDER_TYPES.IFindOrderById).to(FindOrderById)
ordersContainer.bind<ICreateOrder>(ORDER_TYPES.ICreateOrder).to(CreateOrder)
ordersContainer.bind<IDeleteOrder>(ORDER_TYPES.IDeleteOrder).to(DeleteOrders)
ordersContainer.bind<IUpdateOrder>(ORDER_TYPES.IUpdateOrder).to(UpdateOrder)
ordersContainer.bind<IFindAllOrdersByUserId>(ORDER_TYPES.IFindAllOrdersByUserId).to(FindAllOrdersByUserId)
ordersContainer.bind<IUpdateStatus>(ORDER_TYPES.IUpdateStatus).to(UpdateStatus)
ordersContainer.bind<IOrdersControllers>(ORDER_TYPES.IOrdersController).to(OrdersController)
ordersContainer.bind<IAddProductsToOrder>(ORDER_TYPES.IAddProductsToOrders).to(AddProductsToOrders)
ordersContainer.bind<IUserMapper>(USER_TYPES.IUserMapper).to(UserMapper)
ordersContainer.bind<IProductMapper>(PRODUCT_TYPES.IProductMapper).to(ProductMapper)
ordersContainer.bind<IModifyQuantityInOrder>(ORDER_TYPES.IModifyQuantityInOrder).to(ModifyQuantityInOrder)
ordersContainer.bind<IDeleteItemInOrder>(ORDER_TYPES.IDeleteItemInOrder).to(DeleteItemInOrder)
ordersContainer.bind<ITaxCalculator>(ORDER_TYPES.IvaCalculator).to(IvaCalculator)
ordersContainer.bind<ITaxCalculator>(ORDER_TYPES.SaleTaxCalculator).to(SaleTaxCalculator)
ordersContainer.bind<ITaxCalculator>(ORDER_TYPES.SpecificProductTaxCalculator).to(SpecificProductTaxCalculator)
ordersContainer.bind<ITaxCalculator>(ORDER_TYPES.CalculateAllTaxes).to(CalculatedAllTaxes)
ordersContainer.bind<IAddTaxesObject>(ORDER_TYPES.IAddTaxesObject).to(AddTaxesObject)
ordersContainer.bind<ICalculateTotalProductPrices>(ORDER_TYPES.ICalculateTotalProductPrices).to(CalculateTotalProductPrices)
ordersContainer.bind<IFindProductById>(PRODUCT_TYPES.IFindProductById).to(FindProductById)
ordersContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository)
ordersContainer.bind<IUpdateStock>(PRODUCT_TYPES.IUpdateStock).to(UpdateStock)
ordersContainer.bind<IFindAllOrders>(ORDER_TYPES.IFindAllOrders).to(FindAllOrders)

export default ordersContainer
