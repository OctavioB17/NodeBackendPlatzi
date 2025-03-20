import { Router } from "express";
import container from "../../infraestructure/inversify/productContainer";
import IProductController from "../controllers/interfaces/IProductController";
import { PRODUCT_TYPES } from "../../types";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { createProductSchema, getProductSchema, updateProductSchema } from "../../infraestructure/validators/ProductSchema";


const router = Router();
const productController = container.get<IProductController>(PRODUCT_TYPES.IProductController);

router.post('/create', validatorHandler(createProductSchema, 'body'), (req, res, next) => productController.createProductController(req, res, next));
router.post('/delete/:id', validatorHandler(updateProductSchema, 'params'), (req, res, next) => productController.deleteProductController(req, res, next))
router.post('/get-all/category/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.findAllByCategoryController(req, res, next))
router.post('/get-all/user/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.findAllByUserIdController(req, res, next))
router.post('/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.findByIdController(req, res, next))
router.post('/name/:name', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.findByNameController(req, res, next))
router.post('/update/pause/:id', validatorHandler(updateProductSchema, 'params'), (req, res, next) => productController.toggleProductPauseController(req, res, next))
router.post('/update/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.updateProductController(req, res, next))
router.post('/update/stock/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.updateStockController(req, res, next))

export default router;
