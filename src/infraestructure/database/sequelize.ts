import path from "path";
import 'dotenv/config'
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/UserModel";
const envPath = path.resolve(__dirname, '../../var.env');
require('dotenv').config({path: envPath })


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [UserModel],
  logging: false,
});



export default sequelize
