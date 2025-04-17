import { NextFunction, Request, Response } from "express";

export default interface IAuthController {
  localLogin(req: Request, res: Response, next: NextFunction): Promise<void>
}