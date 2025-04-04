import Orders from "../../../domain/entities/Orders";
import OrdersModel from "../../database/models/OrdersModel";

export default interface IOrdersMapper {

  modelToOrder(model: OrdersModel): Orders;

  modelToOrderList(models: OrdersModel[]): Orders[];

  orderToModel(order: Orders): OrdersModel

  orderToModelList(order: Orders[]): OrdersModel[]
}