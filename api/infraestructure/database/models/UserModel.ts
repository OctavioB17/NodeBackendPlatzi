import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { IUserModel } from '../../../domain/interfaces/user/IUserModel';
import ProductModel from './ProductsModel';
import OrdersModel from './OrdersModel';

@Table({ tableName: 'users', timestamps: true })
export default class UserModel extends Model<UserModel> implements IUserModel {
  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare surname: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false})
  declare role: string

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}
