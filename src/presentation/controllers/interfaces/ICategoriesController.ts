import { NextFunction, Request, Response } from "express";

export default interface ICategoriesController {
  createCategoryController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findByIdController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findAllController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  updateCategoryController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  deleteCategoryController(req: Request, res: Response, next: NextFunction):  Promise<void>;
};