import { Request, Response, NextFunction } from "express";

export default interface IUserController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  findUserByMail(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserFromToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllUsersNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  findUserByMailNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserByIdNoPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  changeUserPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  changeRoleController(req: Request, res: Response, next: NextFunction): Promise<void>;
  userDelete(req: Request, res: Response, next: NextFunction): Promise<void>;
  authorizeUserController(req: Request, res: Response, next: NextFunction): Promise<void>;
  sendPassResetRequestController(req: Request, res: Response, next: NextFunction): Promise<void>
}