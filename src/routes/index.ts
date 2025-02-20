import productRouter from "./productsRouter"
import express from "express"
import dotenv from 'dotenv';
import userRouter from "./usersRouter";
dotenv.config();

const apiPrefix = process.env.API_PREFIX

const routerApi = ( app: express.Application ): void => {
  app.use(`${apiPrefix}/products`, productRouter)
  app.use(`${apiPrefix}/users`, userRouter)
}

export default routerApi
