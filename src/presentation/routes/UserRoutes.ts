import { Router } from "express";
import container from "../../infraestructure/inversify/UsersContainer";
import { createUserSchema, updateUserSchema, getUserSchema, updatePasswordUserSchema, getUserSchemaEmail, updateRoleSchema, updatePasswordSchema } from "../../infraestructure/validators/UserSchema"
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import IUserController from "../controllers/interfaces/IUserController";
import { USER_TYPES } from "../../types";
import { paginationSchema } from "../../infraestructure/validators/QuerySchema";
import passport from "passport";
import { checkRoleMiddelware } from "../../infraestructure/middlewares/authHandler";


const router = Router();
const userController = container.get<IUserController>(USER_TYPES.IUserController);

router.post("/register", validatorHandler(createUserSchema, 'body'), (req, res, next) => userController.register(req, res, next));
router.get("/find", passport.authenticate('jwt', { session: false }), checkRoleMiddelware('ADMIN'), validatorHandler(paginationSchema, 'query'), (req, res, next) => userController.findAllUsers(req, res, next));
router.get("/find/no-password", passport.authenticate('jwt', { session: false }), checkRoleMiddelware('MODERATOR'), validatorHandler(paginationSchema, 'query'), (req, res, next) => userController.findAllUsersNoPassword(req, res, next));
router.get("/find/id/:id", passport.authenticate('jwt', { session: false }), checkRoleMiddelware('ADMIN'), validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.getUserById(req, res, next));
router.get("/find/no-password/me", passport.authenticate('jwt', { session: false }), (req, res, next) => userController.getUserFromToken(req, res, next))
router.get("/find/no-password/id/:id", passport.authenticate('jwt', { session: false }), checkRoleMiddelware('MODERATOR'), validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.getUserByIdNoPassword(req, res, next));
router.get("/find/email/:email", validatorHandler(getUserSchemaEmail, 'params'), (req, res, next) => userController.findUserByMail(req, res, next));
router.get("/find/email/no-password/:email", validatorHandler(getUserSchemaEmail, 'params'), (req, res, next) => userController.findUserByMailNoPassword(req, res, next));
router.patch('/change/password', passport.authenticate('jwt', { session: false }), validatorHandler(updatePasswordUserSchema, 'query'), validatorHandler(updatePasswordSchema, 'body'), (req, res, next) => userController.changeUserPassword(req, res, next))
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('USER'), validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.userDelete(req, res, next))
router.get('/authorize-user/:id', validatorHandler(getUserSchema, 'params'), (req, res, next) => userController.authorizeUserController(req, res, next))
router.patch('/change/role/:id', passport.authenticate('jwt', { session: false }), checkRoleMiddelware('ADMIN'), validatorHandler(getUserSchema, 'params'), validatorHandler(updateRoleSchema, 'body'), (req, res, next) => userController.changeRoleController(req, res, next))
router.post('/change/password-reset-request', validatorHandler(getUserSchemaEmail, 'body'), (req, res, next) => userController.sendPassResetRequestController(req, res, next))

export default router;
