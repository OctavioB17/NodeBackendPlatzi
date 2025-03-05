import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/UserModel";
import { config } from 'dotenv';
config()

const USER = process.env.DB_USER ? encodeURIComponent(process.env.DB_USER) : '';
const PASSWORD = process.env.DB_PASSWORD ? encodeURIComponent(process.env.DB_PASSWORD) : ''
const URI = `postgres://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  models: [UserModel],
});



export default sequelize
