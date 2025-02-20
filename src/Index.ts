import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { obtainIp } from './utils/functions';
import routerApi from './routes';

const app = express();
const port = 3000;
const ip = obtainIp();

routerApi(app);

app.listen(port, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
