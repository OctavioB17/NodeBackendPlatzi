import { Table, Column, DataType, Model } from "sequelize-typescript";
import { ICategoriesModel } from "../../../domain/interfaces/categories/ICategoryModel";

@Table({ tableName: 'categories', timestamps: true })
export default class CategoriesModel extends Model<CategoriesModel> implements ICategoriesModel {
  @Column({ type: DataType.UUID, primaryKey: true, unique: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare imageUrl: string;
}
