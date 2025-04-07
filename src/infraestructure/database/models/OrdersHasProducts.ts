import { Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript";
import ProductModel from "./ProductsModel";
import OrdersModel from "./OrdersModel";
import IOrderHasProducts from "../../../domain/interfaces/orders/IOrderHasProducts";

@Table({ tableName: 'order_has_products', timestamps: true })
export default class OrderHasProductsModel extends Model<OrderHasProductsModel> implements IOrderHasProducts {

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
  declare id: number;

  @ForeignKey(() => OrdersModel)
  @Column({ type: DataType.UUID, allowNull: false })
  declare orderId: string

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productId: string

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1})
  declare quantity: number
}