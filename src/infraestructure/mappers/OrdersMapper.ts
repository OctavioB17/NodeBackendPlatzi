import { plainToInstance, instanceToPlain } from "class-transformer";
import Orders from "../../domain/entities/Orders";
import OrdersModel from "../database/models/OrdersModel";
import IOrdersMapper from "./interfaces/IOrdersMapper";
import OrderDTO from "../dtos/OrderDTO";
import OrderHasProducts from "../../domain/entities/OrderHasProducts";
import OrderHasProductsModel from "../database/models/OrdersHasProducts";
import OrderHasProductsDTO from "../dtos/OrderHasProductsDTO";

export default class OrdersMapper implements IOrdersMapper {

  orderHasProductDtoToEntity(dto: OrderHasProductsDTO): OrderHasProducts {
    return plainToInstance(OrderHasProducts, dto)
  }

  orderHasProductDtoToEntityList(dtos: OrderHasProductsDTO[]): OrderHasProducts[] {
    return dtos.map(dto => this.orderHasProductDtoToEntity(dto))
  }

  orderHasProductEntityToDto(entity: OrderHasProducts): OrderHasProductsDTO {
    return plainToInstance(OrderHasProductsDTO, entity)
  }

  orderHasProductEntityToDtoList(entities: OrderHasProducts[]): OrderHasProductsDTO[] {
    return entities.map(entity => this.orderHasProductEntityToDto(entity))
  }

  orderHasProductToModel(orderHasProduct: OrderHasProducts): OrderHasProductsModel {
    return plainToInstance(OrderHasProductsModel, orderHasProduct)
  }

  orderHasProductsToModelList(orderHasProduct: OrderHasProducts[]): OrderHasProductsModel[] {
    return orderHasProduct.map(orderProduct => this.orderHasProductToModel(orderProduct))
  }

  orderHasProductModelToEntity(orderHasProductModel: OrderHasProductsModel): OrderHasProducts {
    return plainToInstance(OrderHasProducts, orderHasProductModel)
  }

  orderHasProductModelToEntityList(orderHasProductModel: OrderHasProductsModel[]): OrderHasProducts[] {
    return orderHasProductModel.map(orderProduct => this.orderHasProductModelToEntity(orderProduct))
  }

  partialDtoToOrder(dto: Partial<OrderDTO>): Partial<Orders> {
    return plainToInstance(Orders, dto, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true
    });
  }

  partialDtoToOrderList(dto: Partial<OrderDTO[]>): Partial<Orders[]> {
    return plainToInstance(Orders, dto, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true
    });
  }

  partialOrderToDto(order: Partial<Orders>): Partial<OrderDTO> {
    return instanceToPlain(order, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true
    }) as OrderDTO;
  }

  partialOrderToDtoList(orders: Partial<Orders[]>): Partial<OrderDTO[]> {
    return instanceToPlain(orders, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true
    }) as OrderDTO[];
  }

  dtoToOrder(dto: OrderDTO): Orders {
    return plainToInstance(Orders, dto)
  }

  dtoToOrderList(dtos: OrderDTO[]): Orders[] {
    return dtos.map(dto => this.dtoToOrder(dto))
  }

  orderToDto(order: Orders): OrderDTO {
    return plainToInstance(OrderDTO, order)
  }

  orderToDtoList(orders: Orders[]): OrderDTO[] {
    return orders.map(order => this.orderToDto(order))
  }

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