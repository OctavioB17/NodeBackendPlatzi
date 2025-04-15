import { NextFunction, Request, Response } from "express";

export default interface IProductController {
  createProductController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findByIdController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findByNameController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findAllByUserIdController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findAllByCategoryController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  updateProductController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  deleteProductController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  updateStockController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  toggleProductPauseController(req: Request, res: Response, next: NextFunction):  Promise<void>;
};