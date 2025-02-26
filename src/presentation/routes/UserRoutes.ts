import { Router } from "express";
import UserController from "../../infraestructure/controllers/UserController";
import { container } from "../../infraestructure/inversify/container";

const router = Router();
const userController = container.get(UserController);

router.post("/register", (req, res) => userController.register(req, res));
router.get("/find", (req, res) => userController.findAllUsers(req, res));
router.get("/find/no-password", (req, res) => userController.findAllUsersNoPassword(req, res));
router.get("/find/id/:id", (req, res) => userController.getUserById(req, res));
router.get("/find/no-password/id/:id", (req, res) => userController.getUserById(req, res));
router.get("/find/id/:id", (req, res) => userController.getUserByIdNoPassword(req, res));
router.get("/find/email/:email", (req, res) => userController.findUserByMail(req, res));
router.get("/find/no-password/email/:email", (req, res) => userController.findUserByMailNoPassword(req, res));
router.patch('/change/password', (req, res) => userController.changeUserPassword(req, res))
router.delete('/delete/:id', (req, res) => userController.userDelete(req, res))

export default router;
