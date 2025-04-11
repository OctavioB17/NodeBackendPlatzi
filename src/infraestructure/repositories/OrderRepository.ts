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
import { OrderWithUserAndProducts, OrderWithUserAndProductsModel } from "../../domain/interfaces/orders/IOrders";

@injectable()
export default class OrderRepository implements IOrdersRepository {

  private ordersMapper: IOrdersMapper;

  constructor(@inject(ORDER_TYPES.IOrdersMapper) ordersMapper: IOrdersMapper) {
    this.ordersMapper = ordersMapper
  }

  async createOrder(order: Orders): Promise<Orders | null> {
    try {
      if(!order) {
        return null
      }
      const orderToModel = this.ordersMapper.orderToModel(order)
      const newOrder = await OrdersModel.create(orderToModel.dataValues)
      if (!newOrder) {
        return null
      }

      return this.ordersMapper.modelToOrder(newOrder.dataValues)
    } catch (error) {
      return null
    }
  }

  async addItemToOrder(orderHasProduct: OrderHasProducts[]): Promise<OrderHasProducts[] | null> {
    try {
      const orderProductToModel = this.ordersMapper.orderHasProductsToModelList(orderHasProduct)
      const orderAddItem = await OrderHasProductsModel.bulkCreate(orderProductToModel.map(orders => orders.dataValues))
      if (!orderAddItem) {
        return null
      }
      return this.ordersMapper.orderHasProductModelToEntityList(orderAddItem.map(model =>  model.dataValues))
    } catch (error) {
      return null
    }
  }

  async deleteItemToOrder(id: string): Promise<Boolean | null> {
    try {
      const deleteOrder = OrderHasProductsModel.destroy({
        where: {
          id: id
        }
      });
      if (!deleteOrder) {
        return false
      }
      return true
    } catch (error) {
      return null
    }
  }

  async modifyQuantityItemsInAnOrder(orders: OrderHasProducts[]): Promise<OrderHasProducts[] | null> {
    try {
      const updatePromises = orders.map(async order => {
        const orderProducts = await this.findOrderHasProductById(order.getId());
        if (!orderProducts) {
          return null;
        }
        return orderProducts.update({
          quantity: order.getQuantity()
        });
      });

      const promiseResolve = await Promise.all(updatePromises);

      const validProducts = promiseResolve.filter((product): product is OrderHasProductsModel => product !== null);

      return this.ordersMapper.orderHasProductModelToEntityList(validProducts);
    } catch (error) {
      return null;
    }
  }

  async findById(id: string): Promise<OrderWithUserAndProducts | null> {
    try {
        const orderModel = await OrdersModel.findByPk(id, {
          include: [
            { model: UserModel, as: 'user',  },
            { model: ProductModel, as: 'products'}
          ],
        });
        if (!orderModel) {
          return null
        }
        const orderWithUserAndProductWQuantity = this.ordersMapper.orderModelToEntityWithRelations(orderModel?.dataValues as OrderWithUserAndProductsModel)
        return orderWithUserAndProductWQuantity
    } catch (error) {
      return null
    }
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

  async findOrderHasProductById(orderHasProductId: string): Promise<OrderHasProductsModel | null> {
    try {
      const orderProducts = await OrderHasProductsModel.findOne({ where: { id: orderHasProductId }})
      if (!orderProducts) {
        return null
      }

      return orderProducts
    } catch (error) {
      return null
    }
  }

  async findProductInOrder(orderId: string, productId: string): Promise<OrderHasProducts | null> {
    try {
      const findProduct = await OrderHasProductsModel.findOne({ where: { productId:  productId, orderId: orderId }});
      if (!findProduct) {
        return null
      }
      const productEntity = this.ordersMapper.orderHasProductDtoToEntity(findProduct.dataValues)
      return productEntity
    } catch (error) {
      return null
    }
  }

  async findAllByUserId(userId: string): Promise<OrderWithUserAndProducts[] | null> {
    try {
      const ordersModel = await OrdersModel.findAll({ where: { userId: userId }, include: [
        { model: UserModel, as: 'user',  },
        { model: ProductModel, as: 'products'}
      ], })
      if (!ordersModel) {
        return null
      }
      const orders = this.ordersMapper.orderModelToEntityWithRelationsList(ordersModel.map(order => order.dataValues) as OrderWithUserAndProductsModel[])
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