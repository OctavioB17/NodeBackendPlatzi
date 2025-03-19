import { Table, Column, DataType, Model, ForeignKey } from "sequelize-typescript";
import { ICategoriesModel } from "../../../domain/interfaces/categories/ICategoryModel";

@Table({ tableName: 'categories', timestamps: true })
export default class CategoriesModel extends Model<CategoriesModel> implements ICategoriesModel {
  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;
}
