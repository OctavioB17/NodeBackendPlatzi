import { Router } from "express";
import { CATEGORY_TYPES } from "../../types";
import ICategoriesController from "../controllers/interfaces/ICategoriesController";
import container from "../../infraestructure/inversify/categoriesContainer";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { createCategorySchema, getCategorySchema, getCategorySchemaByName, updateCategorySchema } from "../../infraestructure/validators/CategorySchema";
import { paginationSchema } from "../../infraestructure/validators/QuerySchema";
import passport from "passport";
import { checkRoleMiddelware } from "../../infraestructure/middlewares/authHandler";
import { upload } from "../../infraestructure/config/multer/multerConfig";

const categoriesRouter = Router();
const categoriesController = container.get<ICategoriesController>(CATEGORY_TYPES.ICategoriesController);

categoriesRouter.delete('/delete/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('ADMIN'), validatorHandler(getCategorySchema , 'params'), (req, res, next) => categoriesController.deleteCategoryController(req, res, next))
categoriesRouter.get('/get/all', validatorHandler(paginationSchema, 'query'), (req, res, next) => categoriesController.findAllController(req, res, next))
categoriesRouter.get('/get/id/:id', validatorHandler(getCategorySchema, 'params'), (req, res, next) => categoriesController.findByIdController(req, res, next))
categoriesRouter.get('/get/by-name/:name', validatorHandler(getCategorySchemaByName, 'params'), (req, res, next) => categoriesController.findByNameController(req, res, next))
categoriesRouter.post('/create', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('MODERATOR'), upload.single('image'), validatorHandler(createCategorySchema, 'body'), (req, res, next) => categoriesController.createCategoryController(req, res, next))
categoriesRouter.patch('/update/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('MODERATOR'), validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), (req, res, next) => categoriesController.updateCategoryController(req, res, next))

export default categoriesRouter
