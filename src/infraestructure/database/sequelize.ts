import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv';
import ProductModel from "./models/ProductsModel";
import CategoriesModel from "./models/CategoriesModel";
import UserModel from "./models/UserModel";
config()

const USER = process.env.DB_USER ? encodeURIComponent(process.env.DB_USER) : '';
const PASSWORD = process.env.DB_PASSWORD ? encodeURIComponent(process.env.DB_PASSWORD) : ''
const URI = `postgres://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  models: [UserModel, ProductModel, CategoriesModel],
} as any);

ProductModel.belongsTo(UserModel, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
UserModel.hasMany(ProductModel, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })

ProductModel.belongsTo(CategoriesModel, { foreignKey: 'categoryId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
CategoriesModel.hasMany(ProductModel, { foreignKey: 'categoryId', onUpdate: 'CASCADE', onDelete: 'CASCADE'});

export default sequelize
