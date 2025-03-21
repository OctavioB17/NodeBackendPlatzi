import { Router } from "express";
import { CATEGORY_TYPES } from "../../types";
import ICategoriesController from "../controllers/interfaces/ICategoriesController";
import container from "../../infraestructure/inversify/categoriesContainer";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "../../infraestructure/validators/CategorySchema";

const categoriesRouter = Router();
const categoriesController = container.get<ICategoriesController>(CATEGORY_TYPES.ICategoriesController);

categoriesRouter.post('/delete/:id', validatorHandler(updateCategorySchema, 'params'), (req, res, next) => categoriesController.deleteCategoryController(req, res, next))
categoriesRouter.post('/get/all', (req, res, next) => categoriesController.findAllController(req, res, next))
categoriesRouter.post('/get/:id', validatorHandler(getCategorySchema, 'params'), (req, res, next) => categoriesController.findByIdController(req, res, next))
categoriesRouter.post('/create', validatorHandler(createCategorySchema, 'body'), (req, res, next) => categoriesController.createCategoryController(req, res, next))
categoriesRouter.post('/update/:id', validatorHandler(updateCategorySchema, 'params'), (req, res, next) => categoriesController.updateCategoryController(req, res, next))

export default categoriesRouter