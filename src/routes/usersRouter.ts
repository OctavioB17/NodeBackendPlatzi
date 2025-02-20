import { Router } from "express";
import { user } from "../interfaces/users";
import generateUsertList from "../db/users";

const userRouter = Router()
const users: user[] = generateUsertList(30)


userRouter.get('/', (req, res) => {
  const { limit, offset } = req.query
  if (limit || offset) {
    const limitArray = []
    for (let index = 0; index < Number(limit); index++) {
      limitArray.push(users[index])
    }
    for (let index = 0; index < Number(offset); index++) {
      limitArray.shift()
    }
    res.send(limitArray)
  } else {
    res.send(users)
  }
})

userRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const product = users.find(productDetail => productDetail.id === parseInt(id))

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

export default userRouter
