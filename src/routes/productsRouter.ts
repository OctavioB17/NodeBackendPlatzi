import { Router } from "express"
import { product } from "../interfaces/products"
import generateProductList from "../db/products"

const productRouter = Router()
const products: product[] = generateProductList(30)

productRouter.get('/', (req, res) => {
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

productRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(productDetail => productDetail.id === parseInt(id))

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

export default productRouter
