import { Router } from "express";
import { user } from "../interfaces/users";
import { createUser, deleteUserById, generateUsertList, updateUser } from "../db/users";

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
  const user = users.find(userDetail => userDetail.id === parseInt(id))

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

userRouter.post('/', (req, res) => {
  const user = req.body

  const newuser = createUser(user)

  if (newuser) {
    res.status(201).json({ message: 'user created' })
  } else {
    res.status(500).json({message: 'Server error'})
  }
})

userRouter.patch('/:id', (req, res) => {
  const user = req.body
  const { id } = req.params

  try {
    const userUpdated = updateUser(user, parseInt(id))
    if (userUpdated) {
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
})

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params
    const userDeleted = deleteUserById(parseInt(id))
    if (userDeleted) {
      res.status(204).json({message: 'Deleted sucessfully'})
    } else {
      res.status(404).json({message: 'Not found'})
    }
  }
)

export default userRouter
