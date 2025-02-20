import productRouter from "./productsRouter"
import express, { Router } from "express"
import dotenv from 'dotenv';
import userRouter from "./usersRouter";
dotenv.config();

const apiPrefix = process.env.API_PREFIX
const router = express.Router()

const routerApi = ( app: express.Application ): void => {
  app.use(`${apiPrefix}`, router)
  router.use(`/products`, productRouter)
  router.use(`/users`, userRouter)
}

export default routerApi
