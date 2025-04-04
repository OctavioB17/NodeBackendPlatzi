import { plainToInstance } from "class-transformer";
import Orders from "../../domain/entities/Orders";
import OrdersModel from "../database/models/OrdersModel";
import IOrdersMapper from "./interfaces/IOrdersMapper";

export default class OrdersMapper implements IOrdersMapper {
  modelToOrder(model: OrdersModel): Orders {
    return plainToInstance(Orders, model)
  }
  modelToOrderList(models: OrdersModel[]): Orders[] {
    return models.map(model => this.modelToOrder(model))
  }
  orderToModel(order: Orders): OrdersModel {
    return plainToInstance(OrdersModel, order)
  }
  orderToModelList(orders: Orders[]): OrdersModel[] {
    return orders.map(order => this.orderToModel(order))
  }

}