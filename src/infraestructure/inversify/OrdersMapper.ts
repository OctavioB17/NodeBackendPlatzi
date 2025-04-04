import { Container } from "inversify";
import IOrdersMapper from "../mappers/interfaces/IOrdersMapper";
import { ORDER_TYPES } from "../../types";
import OrdersMapper from "../mappers/OrdersMapper";

const ordersContainer = new Container();

ordersContainer.bind<IOrdersMapper>(ORDER_TYPES.IOrdersMapper).to(OrdersMapper);