import { Router } from "express";
import UserController from "../../infraestructure/controllers/UserController";
import { container } from "../../infraestructure/inversify/container";

const   router = Router();
const userController = container.get(UserController);

router.post("/register", (req, res, next) => userController.register(req, res, next));
router.get("/find", (req, res, next) => userController.findAllUsers(req, res, next));
router.get("/find/no-password", (req, res, next) => userController.findAllUsersNoPassword(req, res, next));
router.get("/find/id/:id", (req, res, next) => userController.getUserById(req, res, next));
router.get("/find/no-password/id/:id", (req, res, next) => userController.getUserByIdNoPassword(req, res, next));
router.get("/find/email/:email", (req, res, next) => userController.findUserByMail(req, res, next));
router.get("/find/no-password/email/:email", (req, res, next) => userController.findUserByMailNoPassword(req, res, next));
router.patch('/change/password', (req, res, next) => userController.changeUserPassword(req, res, next))
router.delete('/delete/:id', (req, res, next) => userController.userDelete(req, res, next))

export default router;
