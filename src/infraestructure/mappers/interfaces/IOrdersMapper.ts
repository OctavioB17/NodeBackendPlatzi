import { Order } from "sequelize";
import Orders from "../../../domain/entities/Orders";
import OrdersModel from "../../database/models/OrdersModel";
import OrderDTO from "../../dtos/OrderDTO";

export default interface IOrdersMapper {

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