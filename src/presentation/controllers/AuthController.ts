import { Request, Response, NextFunction } from "express";
import IAuthController from "./interfaces/IAuthController";
import User from "../../domain/entities/Users";
import UserDTO from "../../infraestructure/dtos/users/UserDTO";

export default class AuthController implements IAuthController {

  async localLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user as UserDTO
    delete user.password
    try {
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
