import express from "express"
import dotenv from 'dotenv';
import userRouter from "./UserRoutes";
import productRouter from "./ProductRouter"
import categoriesRouter from "./CategoriesRouter";
import ordersRouter from "./OrdersRoutes"
dotenv.config();

const apiPrefix = process.env.API_PREFIX
const router = express.Router()

const routerApi = ( app: express.Application ): void => {
  app.use(`${apiPrefix}`, router)
  router.use(`/users`, userRouter)
  router.use(`/products`, productRouter)
  router.use(`/categories`, categoriesRouter)
  router.use(`/orders`, ordersRouter)
}

export default routerApi
