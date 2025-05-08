import { Request, Response, NextFunction } from "express";
import IAuthController from "./interfaces/IAuthController";
import UserDTO from "../../infraestructure/dtos/users/UserDTO";
import { inject } from "inversify";
import { AUTH_TYPES } from "../../types";
import IRenewAccessToken from "../../app/interfaces/auth/IRenewAccessToken";

export default class AuthController implements IAuthController {

  constructor (@inject(AUTH_TYPES.IRenewAccessToken) private renewAccessToken: IRenewAccessToken ) {}

  async localLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.user as UserDTO
    delete user.password
    try {
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async renewToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: 'Refresh token no proporcionado' });
    }

    try {
      const newAccessToken = await this.renewAccessToken.execute(refreshToken, '15m');
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}
