
import { IProductModel } from "../../../domain/interfaces/products/IProductModel";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import UserModel from "./UserModel";
import CategoriesModel from "./CategoriesModel";

@Table({ tableName: 'products', timestamps: true })
export default class ProductModel extends Model<ProductModel> implements IProductModel {
  @Column({ type: DataType.UUID, primaryKey: true, allowNull: false })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare imageUrl: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare sku: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare length: string

  @Column({ type: DataType.STRING, allowNull: true })
  declare width: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare height: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare weight: number | null;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare price: number;

  @Column({ type: DataType.SMALLINT, allowNull: false })
  declare stock: number;

  @ForeignKey(() => CategoriesModel)
  @Column({ type: DataType.STRING, allowNull: false })
  declare categoryId: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  declare material: string[] | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isPaused: boolean;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;
}