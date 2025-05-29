import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv';
import ProductModel from "./models/ProductsModel";
import CategoriesModel from "./models/CategoriesModel";
import UserModel from "./models/UserModel";
import OrdersModel from "./models/OrdersModel";
import OrderHasProductsModel from "./models/OrdersHasProducts";
config()

const USER = process.env.DB_USER ? encodeURIComponent(process.env.DB_USER) : '';
const PASSWORD = process.env.DB_PASSWORD ? encodeURIComponent(process.env.DB_PASSWORD) : ''
const URI = `postgres://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  models: [UserModel, ProductModel, CategoriesModel, OrdersModel, OrderHasProductsModel],
  logging: false
} as any);

ProductModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  as: 'user'
});
UserModel.hasMany(ProductModel, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

ProductModel.belongsTo(CategoriesModel, {
  foreignKey: 'categoryId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  as: 'categories'
});

CategoriesModel.hasMany(ProductModel, {
  foreignKey: 'categoryId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

OrdersModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  as: 'user'
});

UserModel.hasMany(OrdersModel, {
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

OrdersModel.belongsToMany(ProductModel, {
  through: OrderHasProductsModel,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});

ProductModel.belongsToMany(OrdersModel, {
  through: OrderHasProductsModel,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

export default sequelize;
