import { Router } from "express"
import { product } from "../interfaces/products"
import {createProduct, deleteProductById, generateProductList, updateProduct} from "../db/products"

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

productRouter.post('/', (req, res) => {
  const { productName, id, isbn, product, adjetive, departament, price, material, description } = req.body

  const newProduct = createProduct(productName, id, isbn, product, adjetive, departament, price, material, description)

  if (newProduct) {
    res.status(201).json({ message: 'Product created' })
  } else {
    res.status(500).json({message: 'Server error'})
  }
})

productRouter.patch('/:id', (req, res) => {
  const product = req.body
  const { id } = req.params

  try {
    const productUpdated = updateProduct(product, parseInt(id))
    if (productUpdated) {
      res.status(200).json(product)
    }
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
})

productRouter.delete('/:id', (req, res) => {
  const { id } = req.params
    const productDeleted = deleteProductById(parseInt(id))
    if (productDeleted) {
      res.status(204).json({message: 'Deleted sucessfully'})
    } else {
      res.status(404).json({message: 'Not found'})
    }
  }
)

export default productRouter
