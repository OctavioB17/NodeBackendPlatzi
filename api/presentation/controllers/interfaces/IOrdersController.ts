import { Request, Response, NextFunction } from "express";

export default interface IOrdersControllers {
  createOrderController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findByIdController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  findByUserIdController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  updateOrderController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  updateStatusController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  deleteOrderController(req: Request, res: Response, next: NextFunction):  Promise<void>;
  addItemToOrderController(req: Request, res: Response, next: NextFunction): Promise<void>;
}