import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IUserModel } from '../../../domain/interfaces/user/IUserModel';

@Table({ tableName: 'users', timestamps: true })
export class UserModel extends Model<UserModel> implements IUserModel {
  @Column({ type: DataType.UUIDV4, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;
}
