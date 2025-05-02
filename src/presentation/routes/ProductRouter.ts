import { Router } from "express";
import container from "../../infraestructure/inversify/ProductsContainer";
import IProductController from "../controllers/interfaces/IProductController";
import { PRODUCT_TYPES } from "../../types";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { createProductSchema, getProductSchema, getProductSchemaByName, getProductWPaginationAndPriceOperators, updatePhotosSchema, updateStockSchema } from "../../infraestructure/validators/ProductSchema";
import passport from "passport";
import { checkRoleMiddelware } from "../../infraestructure/middlewares/authHandler";
import { upload } from "../../infraestructure/config/multer/multerConfig";

const router = Router();
const productController = container.get<IProductController>(PRODUCT_TYPES.IProductController);

router.post('/create', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), upload.array('image'), validatorHandler(createProductSchema, 'body'), (req, res, next) => productController.createProductController(req, res, next));
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.deleteProductController(req, res, next))
router.get('/get-all/category/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(getProductWPaginationAndPriceOperators, 'query'), (req, res, next) => productController.findAllByCategoryController(req, res, next))
router.get('/get-all/user/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(getProductWPaginationAndPriceOperators, 'query'), (req, res, next) => productController.findAllByUserIdController(req, res, next))
router.get('/get/id/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.findByIdController(req, res, next))
router.get('/get/name/:name', validatorHandler(getProductSchemaByName, 'params'), validatorHandler(getProductWPaginationAndPriceOperators, 'query'), (req, res, next) => productController.findByNameController(req, res, next))
router.get('/get-all/random', (req, res, next) => productController.findAllRandomizedController(req, res, next) )
router.patch('/update/pause/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.toggleProductPauseController(req, res, next))
router.patch('/update/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getProductSchema, 'params'), (req, res, next) => productController.updateProductController(req, res, next))
router.patch('/update/stock/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getProductSchema, 'params'), validatorHandler(updateStockSchema, 'body'), (req, res, next) => productController.updateStockController(req, res, next))
router.patch('/update/photos', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(updatePhotosSchema, 'params'), validatorHandler(updateStockSchema, 'body'), (req, res, next) => productController.updateStockController(req, res, next))

export default router;
