import { plainToInstance, instanceToPlain } from "class-transformer";
import Orders from "../../domain/entities/Orders";
import OrdersModel from "../database/models/OrdersModel";
import IOrdersMapper from "./interfaces/IOrdersMapper";
import OrderHasProducts from "../../domain/entities/OrderHasProducts";
import OrderHasProductsModel from "../database/models/OrdersHasProducts";
import OrderHasProductsDTO from "../dtos/orders/OrderHasProductsDTO";
import OrderDTO from "../dtos/orders/OrderDTO";
import IUserMapper from "./interfaces/IUserMapper";
import IProductMapper from "./interfaces/IProductMapper";
import { inject } from "inversify";
import { PRODUCT_TYPES, USER_TYPES } from "../../types";
import { UserNoPassword } from "../../domain/interfaces/user/IUser";
import { IProductWithQuantityDTO } from "../../domain/interfaces/products/IProductWithQuantityDTO";
import { OrderWithUserAndProducts, OrderWithUserAndProductsModel } from "../../domain/interfaces/orders/IOrders";


export default class OrdersMapper implements IOrdersMapper {

  private userMapper: IUserMapper;
  private productMapper: IProductMapper;
  constructor(
    @inject(USER_TYPES.IUserMapper) userMapper: IUserMapper,
    @inject(PRODUCT_TYPES.IProductMapper) productMapper: IProductMapper
  ) {
    this.productMapper = productMapper;
    this.userMapper = userMapper
  }

  orderModelToEntityWithRelations(model: OrderWithUserAndProductsModel): OrderWithUserAndProducts {

    const user: UserNoPassword = {
      id: model.user.id,
      name: model.user.name,
      surname: model.user.surname,
      email: model.user.email,
      role: model.user.role,
    };

    const products: IProductWithQuantityDTO[] = model.products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      imageGallery: product.imageGallery ?? [],
      sku: product.sku ?? '',
      length: product.length ?? '',
      width: product.width ?? '',
      height: product.height ?? '',
      weight: product.weight ?? 0,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId ?? '',
      material: product.material ?? [],
      isPaused: product.isPaused ?? false,
      userId: product.userId ?? '',
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      quantity: product.OrderHasProductsModel.dataValues.quantity || product.OrderHasProductsModel.quantity,
    })) ?? [];

    const order = new Orders(
      model.id,
      model.userId,
      model.status,
      model.totalPrice,
      model.paymentMethod,
      model.taxes
    );

    const orderWithExtras = {
      ...order,
      user: user,
      products: products
    } as OrderWithUserAndProducts
    return orderWithExtras;
  }

  orderModelToEntityWithRelationsList(models: OrderWithUserAndProductsModel[]): OrderWithUserAndProducts[] {
    return models.map(model => this.orderModelToEntityWithRelations(model))
  }

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
