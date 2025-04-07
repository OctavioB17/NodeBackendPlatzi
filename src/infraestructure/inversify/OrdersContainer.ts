import { Container } from "inversify";
import IOrdersMapper from "../mappers/interfaces/IOrdersMapper";
import { ORDER_TYPES } from "../../types";
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

const ordersContainer = new Container();

ordersContainer.bind<IOrdersMapper>(ORDER_TYPES.IOrdersMapper).to(OrdersMapper);
ordersContainer.bind<IFindOrderById>(ORDER_TYPES.IFindOrderById).to(FindOrderById)
ordersContainer.bind<ICreateOrder>(ORDER_TYPES.ICreateOrder).to(CreateOrder)
ordersContainer.bind<IDeleteOrder>(ORDER_TYPES.IDeleteOrder).to(DeleteOrders)
ordersContainer.bind<IUpdateOrder>(ORDER_TYPES.IUpdateOrder).to(UpdateOrder)
ordersContainer.bind<IFindAllOrdersByUserId>(ORDER_TYPES.IFindAllOrdersByUserId).to(FindAllOrdersByUserId)
ordersContainer.bind<IUpdateStatus>(ORDER_TYPES.IUpdateStatus).to(UpdateStatus)

export default ordersContainer