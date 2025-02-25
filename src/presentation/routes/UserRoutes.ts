import { Router } from "express";
import UserController from "../../infraestructure/controllers/UserController";
import { container } from "../../infraestructure/inversify/container";

const router = Router();
const userController = container.get(UserController);

router.post("/register", (req, res) => userController.register(req, res));

export default router;
