import { Model } from "sequelize";
import { Table, Column, DataType, AllowNull } from "sequelize-typescript";
import { ICategoriesModel } from "../../../domain/interfaces/categories/ICategoryModel";
import Product from "../../../domain/entities/Product";

@Table({ tableName: 'categories', timestamps: true })
export default class CategoriesModel extends Model<CategoriesModel> implements ICategoriesModel {
  @Column({ type: DataType.UUID, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare products: Product[];
}
