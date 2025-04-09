import Orders from "../../../domain/entities/Orders";
import OrdersModel from "../../database/models/OrdersModel";
import OrderHasProducts from "../../../domain/entities/OrderHasProducts";
import OrderHasProductsModel from "../../database/models/OrdersHasProducts";
import OrderHasProductsDTO from "../../dtos/orders/OrderHasProductsDTO";
import OrderDTO from "../../dtos/orders/OrderDTO";
import ProductModel from "../../database/models/ProductsModel";
import UserModel from "../../database/models/UserModel";
import { OrderWithUserAndProducts, OrderWithUserAndProductsModel } from "../../../domain/interfaces/orders/IOrders";

export default interface IOrdersMapper {

  orderModelToEntityWithRelations(model: OrderWithUserAndProductsModel): OrderWithUserAndProducts

  orderModelToEntityWithRelationsList(models: OrderWithUserAndProductsModel[]): OrderWithUserAndProducts[]

  orderHasProductDtoToEntity(dto: OrderHasProductsDTO): OrderHasProducts

  orderHasProductDtoToEntityList(dtos: OrderHasProductsDTO[]): OrderHasProducts[]

  orderHasProductEntityToDto(entity: OrderHasProducts): OrderHasProductsDTO

  orderHasProductEntityToDtoList(entities: OrderHasProducts[]): OrderHasProductsDTO[]

  orderHasProductToModel(orderHasProduct: OrderHasProducts): OrderHasProductsModel

  orderHasProductsToModelList(orderHasProduct: OrderHasProducts[]): OrderHasProductsModel[]

  orderHasProductModelToEntity(orderHasProductModel: OrderHasProductsModel): OrderHasProducts

  orderHasProductModelToEntityList(orderHasProductModel: OrderHasProductsModel[]): OrderHasProducts[]

  partialDtoToOrder(dto: Partial<OrderDTO>): Partial<Orders>

  partialDtoToOrderList(dto: Partial<OrderDTO[]>): Partial<Orders[]>

  partialOrderToDto(dto: Partial<Orders>): Partial<OrderDTO>

  partialOrderToDtoList(dto: Partial<Orders[]>): Partial<OrderDTO[]>

  dtoToOrder(dto: OrderDTO): Orders

  dtoToOrderList(dtos: OrderDTO[]): Orders[]

  orderToDto(order: Orders): OrderDTO

  orderToDtoList(orders: Orders[]): OrderDTO[]

  modelToOrder(model: OrdersModel): Orders;

  modelToOrderList(models: OrdersModel[]): Orders[];

  orderToModel(order: Orders): OrdersModel

  orderToModelList(order: Orders[]): OrdersModel[]
}
