import { Model } from "sequelize";
import { IOrders, Taxes } from "../../../domain/interfaces/orders/IOrders";
import Product from "../../../domain/entities/Products";
import User from "../../../domain/entities/Users";
import { Column, DataType, } from "sequelize-typescript";

export default class OrdersModel extends Model<OrdersModel> implements IOrders {
  @Column({ type: DataType.UUID, primaryKey: true, allowNull: false })
  declare id: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  declare products: Product[];

  @Column({ type: DataType.STRING, allowNull: false })
  declare user: User;

  @Column({ type: DataType.STRING, allowNull: false})
  declare status: string;

  @Column({ type: DataType.NUMBER, allowNull: false})
  declare totalPrice: number;

  @Column({ type: DataType.STRING, allowNull: false})
  declare paymentMethod: string;

  @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: false})
  declare taxes: Taxes[];
}