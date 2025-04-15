import { IOrders, Taxes } from "../../../domain/interfaces/orders/IOrders";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table, } from "sequelize-typescript";
import ProductModel from "./ProductsModel";
import UserModel from "./UserModel";
import OrderHasProductsModel from "./OrdersHasProducts";

@Table({ tableName: 'orders', timestamps: true })
export default class OrdersModel extends Model<OrdersModel> implements IOrders {
  @Column({ type: DataType.UUID, primaryKey: true, allowNull: false })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.STRING, allowNull: false })
  declare userId: string;

  @Column({ type: DataType.STRING, allowNull: false})
  declare status: string;

  @Column({ type: DataType.NUMBER, allowNull: false})
  declare totalPrice: number;

  @Column({ type: DataType.STRING, allowNull: false})
  declare paymentMethod: string;

  @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: false})
  declare taxes: Taxes[];
}