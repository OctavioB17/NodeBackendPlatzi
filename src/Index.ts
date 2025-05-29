import dotenv from 'dotenv';
dotenv.config();
import { obtainIp } from './utils/functions';
import app from './server'

const port = 3000;
const ip: string = obtainIp() || 'localhost';

app.listen(port, ip, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
