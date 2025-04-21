import { Router } from "express";
import container from "../../infraestructure/inversify/OrdersContainer";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { ORDER_TYPES } from "../../types";
import IOrdersControllers from "../controllers/interfaces/IOrdersController";
import { createOrderSchema, getOrderSchema, getOrderSchemaByUserId, updateOrderSchema, updateStatusOrderSchema } from "../../infraestructure/validators/OrderSchema";
import { addItemSchema } from "../../infraestructure/validators/OrderHasProductsSchema";
import { paginationSchema } from "../../infraestructure/validators/QuerySchema";
import passport from "passport";
import { checkRoleMiddelware } from "../../infraestructure/middlewares/authHandler";

const router = Router();
const ordersController = container.get<IOrdersControllers>(ORDER_TYPES.IOrdersController);

router.post('/create', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(createOrderSchema, 'body'), (req, res, next) => ordersController.createOrderController(req, res, next));
router.get('/find/id/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.findByIdController(req, res, next));
router.get('/find/user-id/:userId', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getOrderSchemaByUserId, 'params'), validatorHandler(paginationSchema, 'query'), (req, res, next) => ordersController.findByUserIdController(req, res, next));
router.post('/add-item/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(addItemSchema, 'body'), validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.addItemToOrderController(req, res, next))
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getOrderSchema, 'params'), (req, res, next) => ordersController.deleteOrderController(req, res, next));
router.patch('/update/id/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(updateOrderSchema, 'body'), (req, res, next) => ordersController.updateOrderController(req, res, next));
router.patch('/update/status/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(updateStatusOrderSchema, 'body'), (req, res, next) => ordersController.updateStatusController(req, res, next));

export default router;
