import { inject } from "inversify";
import { ICreateUser } from "../../app/interfaces/users/post/ICreateUser";
import { Response, Request, NextFunction } from "express";
import {USER_TYPES} from "../../types";
import { IFindAll } from "../../app/interfaces/users/get/IFindAll";
import { IFindAllNoPassword } from "../../app/interfaces/users/get/IFindAllNoPassword";
import { IFindUserById } from "../../app/interfaces/users/get/IFindUserById";
import { IFindUserByIdNoPassword } from "../../app/interfaces/users/get/IFindUserByIdNoPassword";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import { IFindUserByEmailNoPassword } from "../../app/interfaces/users/get/IFindUserByEmailNoPassword";
import { IDeleteUser } from "../../app/interfaces/users/delete/IDeleteUser";
import { IChangePassword } from "../../app/interfaces/users/patch/IChangePassword";

export default class UserController {
  constructor(
    @inject(USER_TYPES.ICreateUser) private createUser: ICreateUser,
    @inject(USER_TYPES.IFindAll) private findAll: IFindAll,
    @inject(USER_TYPES.IFindAllNoPassword) private findAllNoPassword: IFindAllNoPassword,
    @inject(USER_TYPES.IFindUserById) private findUserById: IFindUserById,
    @inject(USER_TYPES.IFindUserByIdNoPassword) private findUserByIdNoPassword: IFindUserByIdNoPassword,
    @inject(USER_TYPES.IFindUserByEmail) private findUserByEmail: IFindUserByEmail,
    @inject(USER_TYPES.IFindUserByEmailNoPassword) private findUserByEmailNoPassword: IFindUserByEmailNoPassword,
    @inject(USER_TYPES.IDeleteUser) private deleteUser: IDeleteUser,
    @inject(USER_TYPES.IChangePassword) private changePassword: IChangePassword
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = req.body;
      const user = await this.createUser.execute(userDTO);
      console.log(user)
      if (user) {
        res.status(201).json(user)
      } else {
        res.status(400).json({ error: 'Can not create user' })
      }
    } catch (error: any) {
      if (error.message === 'Failed to create user: Error: Email registered.') {
        res.status(400).json('User already registered')
      } else {
        res.status(500).json({ error: 'Server Error', details: error.message })
      }
    }
  }

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.findAll.execute()
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async findUserByMail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params
    try {
      const user = await this.findUserByEmail.execute(email)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await this.findUserById.execute(id)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async findAllUsersNoPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.findAllNoPassword.execute()
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async findUserByMailNoPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params
    try {
      const user = await this.findUserByEmailNoPassword.execute(email)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async getUserByIdNoPassword(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await this.findUserByIdNoPassword.execute(id)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async changeUserPassword(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body
    try {
      const changePass = await this.changePassword.execute(password, email)
      if (changePass) {
        res.status(200).json('Password changed')
      } else {
        res.status(400).json('No users found')
      }
    } catch (error) {
      next(error)
    }
  }

  async userDelete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const isUserDeleted = await this.deleteUser.execute(id);
      if (isUserDeleted) {
        res.json(204).json('User deleted')
      } else {
        res.json(500).json('Failed to delete user')
      }
    } catch (error) {
      next(error)
    }
  }
}
