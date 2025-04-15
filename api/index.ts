import dotenv from 'dotenv';
dotenv.config();
import { obtainIp } from '../src/utils/functions';
import app from '../src/server'

const port = 3000;
const ip: string = obtainIp() || 'localhost';


app.listen(port, ip, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
