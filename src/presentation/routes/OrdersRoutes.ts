import { Router } from "express";
import container from "../../infraestructure/inversify/UsersContainer";
import { createUserSchema, updateUserSchema, getUserSchema, updatePasswordUserSchema, getUserSchemaEmail } from "../../infraestructure/validators/UserSchema"
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import IUserController from "../controllers/interfaces/IUserController";
import { ORDER_TYPES, USER_TYPES } from "../../types";
import IOrdersControllers from "../controllers/interfaces/IOrdersController";
import { createOrderSchema, updateOrderSchema, updateStatusOrderSchema } from "../../infraestructure/validators/OrderSchema";


const router = Router();
const ordersController = container.get<IOrdersControllers>(ORDER_TYPES.IOrdersController);

router.post('/create', validatorHandler(createOrderSchema, 'body'), (req, res, next) => ordersController.createOrderController(req, res, next));
router.get('/find/id/:id', validatorHandler(getUserSchema, 'params'), (req, res, next) => ordersController.findByIdController(req, res, next));
router.get('/find/user-id/:userId', validatorHandler(getUserSchema, 'params'), (req, res, next) => ordersController.findByUserIdController(req, res, next));
router.delete('/delete/:id', validatorHandler(getUserSchema, 'params'), (req, res, next) => ordersController.deleteOrderController(req, res, next));
router.patch('/update/id/:id', validatorHandler(updateOrderSchema, 'body'), (req, res, next) => ordersController.updateOrderController(req, res, next));
router.patch('/update/status/:id', validatorHandler(updateStatusOrderSchema, 'body'), (req, res, next) => ordersController.updateStatusController(req, res, next));

export default router;
