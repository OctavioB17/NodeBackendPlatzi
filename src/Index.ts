import express from 'express';
import { obtainIp } from './utils/functions';
import generateProductList from './db/products'
import { product } from './interfaces/routes';

const app = express()
const port = 3000;
const ip = obtainIp()
const products: product[] = generateProductList(30)


app.get('/', (req, res) => {
   res.send('Hello, my server in Express.js')
})

/*app.get('/products', (req, res) => {
  res.json(products)
})*/

app.get('/products', (req, res) => {
  const { limit, offset } = req.query
  if (limit || offset) {
    const limitArray = []
    for (let index = 0; index < Number(limit); index++) {
      limitArray.push(products[index])
    }
    for (let index = 0; index < Number(offset); index++) {
      limitArray.shift()
    }
    res.send(limitArray)
  } else {
    res.send(products)
  }
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(productDetail => productDetail.id === parseInt(id))

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

app.listen(port, () => {
  console.log(`Listening in http://${ip}:${port}`)
})
