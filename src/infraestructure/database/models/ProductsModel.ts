import { Model } from "sequelize";
import { IProductModel } from "../../../domain/interfaces/products/IProductModel";
import { AllowNull, Column, DataType } from "sequelize-typescript";
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
  declare dimensions: { length: string; width: string; heigth: string; } | null;

  @Column({ type: DataType.SMALLINT, allowNull: true })
  declare weigth: number | null;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number;

  @Column({ type: DataType.SMALLINT, allowNull: false })
  declare stock: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare categoryId: string;

  @Column({ type: DataType.ARRAY, allowNull: false })
  declare material: string[] | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isPaused: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  declare userId: string;

}