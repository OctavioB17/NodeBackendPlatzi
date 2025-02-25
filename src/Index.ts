import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { obtainIp } from './utils/functions';
import routerApi from './presentation/routes';

const app = express();
app.use(express.json());
const port = 3000;
const ip = obtainIp();


routerApi(app);
app.listen(port, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
