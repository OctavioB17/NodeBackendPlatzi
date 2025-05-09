import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routerApi from './presentation/routes';
import { boomErrorHandling, errorHandlingMiddleware, logError } from './infraestructure/middlewares/httpError';
import syncDatabase from './infraestructure/database/DataBaseSync';
import { corsConfig } from './infraestructure/config/server/corsConfig';
import { initContainers } from './containers';
import passport from 'passport';

const app = express()
app.use(express.json())
app.use(corsConfig)
syncDatabase()
routerApi(app)
initContainers()

app.use(logError)
app.use(boomErrorHandling)
app.use(errorHandlingMiddleware)
app.use(passport.initialize());

export default app
