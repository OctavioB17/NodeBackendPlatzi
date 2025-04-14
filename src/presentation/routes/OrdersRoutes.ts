import { Router } from "express";
import container from "../../infraestructure/inversify/OrdersContainer";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { ORDER_TYPES } from "../../types";
import IOrdersControllers from "../controllers/interfaces/IOrdersController";
import { createOrderSchema, getOrderSchema, getOrderSchemaByUserId, updateOrderSchema, updateStatusOrderSchema } from "../../infraestructure/validators/OrderSchema";
import { addItemSchema } from "../../infraestructure/validators/OrderHasProductsSchema";
import { paginationSchema } from "../../infraestructure/validators/QuerySchema";

const router = Router();
const ordersController = container.get<IOrdersControllers>(ORDER_TYPES.IOrdersController);

router.post('/create', validatorHandler(createOrderSchema, 'body'), (req, res, next) => ordersController.createOrderController(req, res, next));
router.get('/find/id/:id', validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.findByIdController(req, res, next));
router.get('/find/user-id/:userId', validatorHandler(getOrderSchemaByUserId, 'params'), validatorHandler(paginationSchema, 'query'), (req, res, next) => ordersController.findByUserIdController(req, res, next));
router.post('/add-item/:id', validatorHandler(addItemSchema, 'body'), validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.addItemToOrderController(req, res, next))
router.delete('/delete/:id', validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.deleteOrderController(req, res, next));
router.patch('/update/id/:id', validatorHandler(updateOrderSchema, 'body'), (req, res, next) => ordersController.updateOrderController(req, res, next));
router.patch('/update/status/:id', validatorHandler(updateStatusOrderSchema, 'body'), (req, res, next) => ordersController.updateStatusController(req, res, next));

export default router;
