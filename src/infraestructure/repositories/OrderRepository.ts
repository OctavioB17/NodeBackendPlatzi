import { inject, injectable } from "inversify";
import Orders from "../../domain/entities/Orders";
import { statusTypes } from "../../domain/interfaces/orders/OrdersTypes";
import IOrdersRepository from "../../domain/repositories/IOrdersRepository";
import { ORDER_TYPES } from "../../types";
import OrdersModel from "../database/models/OrdersModel";
import IOrdersMapper from "../mappers/interfaces/IOrdersMapper";
import OrderHasProductsModel from "../database/models/OrdersHasProducts";
import UserModel from "../database/models/UserModel";
import ProductModel from "../database/models/ProductsModel";
import OrderHasProducts from "../../domain/entities/OrderHasProducts";

@injectable()
export default class OrderRepository implements IOrdersRepository {

  private ordersMapper: IOrdersMapper;

  constructor(@inject(ORDER_TYPES.IOrdersMapper) ordersMapper: IOrdersMapper) {
    this.ordersMapper = ordersMapper
  }

  async createOrder(order: Orders): Promise<boolean | null> {
   /* try {*/
      if(!order) {
        return null
      }
      const orderToModel = this.ordersMapper.orderToModel(order)
      const newOrder = await OrdersModel.create(orderToModel)
      if (newOrder) {
        return true
      } else {
        return false
      }
   /* } catch (error) {
      return null
    }*/
  }

  async addItemToOrder(orderHasProduct: OrderHasProducts[]): Promise<OrderHasProducts[] | null> {
    try {
      const orderProductToModel = this.ordersMapper.orderHasProductsToModelList(orderHasProduct)
      const orderAddItem = await OrderHasProductsModel.bulkCreate(orderProductToModel)
      if (!orderAddItem) {
        return null
      }
      return this.ordersMapper.orderHasProductModelToEntityList(orderAddItem)
    } catch (error) {
      return null
    }
  }

  async findById(id: string): Promise<Orders | null> {
    /*try {*/
        const orderModel = await OrdersModel.findByPk(id, {
          include: [
            { model: UserModel, as: 'user'  },
            { model: ProductModel, as: 'products' }
          ],
        });
        console.log(orderModel)
        if (!orderModel) {
          return null
        }
        const order = this.ordersMapper.modelToOrder(orderModel);
        return order
   /* } catch (error) {
      return null
    }*/
  }

  async findByIdInSystem(id: string): Promise<OrdersModel | null> {
    try {
      const orderModel = await OrdersModel.findByPk(id);
      if (!orderModel) {
        return null
      }
      return orderModel
    } catch (error) {
      return null
    }
  }

  async findAllByUserId(userId: string): Promise<Orders[] | null> {
    try {
      const ordersModel = await OrdersModel.findAll({ where: { userId: userId } })
      if (!ordersModel) {
        return null
      }
      const orders = this.ordersMapper.modelToOrderList(ordersModel);
      return orders
    } catch (error) {
      return null
    }
  }

  async updateOrder(orderId: string, orderData: Partial<Orders>): Promise<Orders | null> {
    try {
      const orderModel = await this.findByIdInSystem(orderId)
      if (!orderModel) {
        return null
      }
      const updateOrderData = this.ordersMapper.orderToModel(orderData as Orders)
      const updatedOrder = await orderModel.update({ ...updateOrderData })
      return this.ordersMapper.modelToOrder(updatedOrder)
    } catch (error) {
      return null
    }
  }

  async updateStatus(orderId : string, status: statusTypes): Promise<string | null> {
    try {
      const orderModel = await this.findByIdInSystem(orderId)
      if (!orderModel) {
        return null
      }
      const updatedOrder = await orderModel.update({ status })
      if (!updatedOrder) {
        return null
      }
      return status
    } catch (error) {
      return null
    }
  }

  async deleteOrder(id: string): Promise<boolean | null> {
    try {
      const orderModel = await this.findByIdInSystem(id)
      if (!orderModel) {
        return false
      };
      await orderModel.destroy();
      return true
    } catch (error) {
      return null
    }
  }
}