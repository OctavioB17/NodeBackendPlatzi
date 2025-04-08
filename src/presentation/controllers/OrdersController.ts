import { Request, Response, NextFunction } from "express";
import IOrdersControllers from "./interfaces/IOrdersController";
import { inject } from "inversify";
import { ORDER_TYPES } from "../../types";
import IDeleteOrder from "../../app/interfaces/orders/delete/IDeleteOrder";
import IFindAllOrdersByUserId from "../../app/interfaces/orders/get/IFindAllOrdersByUserId";
import IFindOrderById from "../../app/interfaces/orders/get/IFindOrderById";
import IUpdateOrder from "../../app/interfaces/orders/patch/IUpdateOrder";
import IUpdateStatus from "../../app/interfaces/orders/patch/IUpdateStatus";
import ICreateOrder from "../../app/interfaces/orders/post/ICreateOrder";
import IOrdersMapper from "../../infraestructure/mappers/interfaces/IOrdersMapper";
import { BoomError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";
import IAddProductsToOrder from "../../app/interfaces/orders/post/IAddProductsToOrder";

export default class OrdersController implements IOrdersControllers {

  constructor(
    @inject(ORDER_TYPES.ICreateOrder) private createOrder: ICreateOrder,
    @inject(ORDER_TYPES.IDeleteOrder) private deleteOrder: IDeleteOrder,
    @inject(ORDER_TYPES.IFindAllOrdersByUserId) private findByUserId: IFindAllOrdersByUserId,
    @inject(ORDER_TYPES.IFindOrderById) private findById: IFindOrderById,
    @inject(ORDER_TYPES.IOrdersMapper) private ordersMapper: IOrdersMapper,
    @inject(ORDER_TYPES.IUpdateOrder) private updateOrder: IUpdateOrder,
    @inject(ORDER_TYPES.IUpdateStatus) private updateStatus: IUpdateStatus,
    @inject(ORDER_TYPES.IAddProductsToOrders) private addProductsToOrdes: IAddProductsToOrder
  ) {}

  async createOrderController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const orderData = req.body
    console.log(orderData)
    try {
      const execute = await this.createOrder.execute(orderData)
      if (!execute) {
        throw new BoomError({
          message: 'Failed to create order',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      res.status(201).json({ message: 'Order created' })
    } catch (error) {
      next(error)
    }
  }

  async addItemToOrderController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.addProductsToOrdes.execute(req.body);

      if (!result) {
        throw new BoomError({
          message: 'Failed to add products to order',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  async findByIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const order = await this.findById.execute(id)
      if (!order) {
        throw new BoomError({
          message: 'Failed to find order',
          type: ErrorType.NOT_FOUND,
          statusCode: 500
        });
      }
      const orderDto = this.ordersMapper.orderToDto(order)
      res.status(200).json(orderDto)
    } catch (error) {
      next(error)
    }
  }

  async findByUserIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params
    try {
      const orders = await this.findByUserId.execute(userId);
      if (!orders) {
        throw new BoomError({
          message: 'Failed to find order',
          type: ErrorType.NOT_FOUND,
          statusCode: 500
        });
      }
      const orderDto = this.ordersMapper.orderToDtoList(orders)
      res.status(200).json(orderDto)
    } catch (error) {
      next(error)
    }
  }
  async updateOrderController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { orderId } = req.params
    const orderData = req.body
    try {
      const update = await this.updateOrder.execute(orderId, orderData)
      if (!update) {
        throw new BoomError({
          message: 'Failed to find or update order',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      res.status(200).json({ message: 'Order sucessfully updated' })
    } catch (error) {
      next(error)
    }
  }

  async updateStatusController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { orderId } = req.params;
    const status = req.body;
    try {
      const updateStatus = await this.updateStatus.execute(orderId, status)
      if (!status) {
        throw new BoomError({
          message: 'Failed to find or update order',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      res.status(200).json({ message: `Order status sucessfully updated by ${updateStatus}` })
    } catch (error) {
      next(error)
    }
  }

  async deleteOrderController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const deleteOrder = await this.deleteOrder.execute(id)
      if (!deleteOrder) {
        throw new BoomError({
          message: 'Failed to find or delete order',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      res.status(204).json({ message: `Order ${id} sucessfully deleted` })
    } catch (error) {
      next(error)
    }
  }

}