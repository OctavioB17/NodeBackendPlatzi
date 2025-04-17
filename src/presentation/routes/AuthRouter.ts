import { Router } from "express";
import authContainer from "../../infraestructure/inversify/AuthContainer";
import IAuthController from "../controllers/interfaces/IAuthController";
import { AUTH_TYPES } from "../../types";
import { validatorHandler } from "../../infraestructure/middlewares/validatorHandler";
import { loginLocalSchema } from "../../infraestructure/validators/AuthSchema";
import passport, { session } from "passport";

const authRouter = Router()
const authController = authContainer.get<IAuthController>(AUTH_TYPES.IAuthController);

authRouter.post('/local', validatorHandler(loginLocalSchema, 'body'), passport.authenticate('local', { session: false }), (req, res, next) => authController.localLogin(req, res, next))

export default authRouter