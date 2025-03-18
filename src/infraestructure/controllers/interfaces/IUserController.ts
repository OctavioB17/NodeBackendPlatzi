import { Request, Response, NextFunction } from "express";

export interface IUserController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  findUserByMail(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllUsersNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  findUserByMailNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserByIdNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  changeUserPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  userDelete(req: Request, res: Response, next: NextFunction): Promise<void>;
}