import express from 'express';
import { obtainIp } from './utils/functions';

const app = express()
const port = 3000;
const ip = obtainIp()

app.get('/', (req, res) => {
   res.send('Hello, my server in Express.js')
})

app.listen(port, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
