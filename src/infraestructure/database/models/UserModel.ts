import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import { IUserModel } from '../../../domain/interfaces/user/IUserModel';
import { USER_TYPES } from '../../../types';
import { UserRolesEnum } from '../../../domain/interfaces/user/UserRoles';

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

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: UserRolesEnum.USER})
  declare role: string

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare authorized: boolean

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}
