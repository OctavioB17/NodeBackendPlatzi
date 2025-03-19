import { Router } from "express";
import { container } from "../../infraestructure/inversify/userContainer";
import { createUserSchema, updateUserSchema, getUserSchema, updatePasswordUserSchema, getUserSchemaEmail } from "../../infraestructure/validators/UserSchema"
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { IUserController } from "../../infraestructure/controllers/interfaces/IUserController";
import { USER_TYPES } from "../../types";


const router = Router();
const userController = container.get<IUserController>(USER_TYPES.IUserController);

router.post("/register", validatorHandler(createUserSchema, 'body'), (req, res, next) => userController.register(req, res, next));
router.get("/find", (req, res, next) => userController.findAllUsers(req, res, next));
router.get("/find/no-password", (req, res, next) => userController.findAllUsersNoPassword(req, res, next));
router.get("/find/id/:id", validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.getUserById(req, res, next));
router.get("/find/no-password/id/:id", validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.getUserByIdNoPassword(req, res, next));
router.get("/find/email/:email", validatorHandler(getUserSchemaEmail, 'params'), (req, res, next) => userController.findUserByMail(req, res, next));
router.get("/find/email/no-password/:email", validatorHandler(getUserSchemaEmail, 'params'), (req, res, next) => userController.findUserByMailNoPassword(req, res, next));
router.patch('/change/password', validatorHandler(updatePasswordUserSchema, 'body'), (req, res, next) => userController.changeUserPassword(req, res, next))
router.delete('/delete/:id', validatorHandler(updateUserSchema, 'params'), (req, res, next) => userController.userDelete(req, res, next))

export default router;
