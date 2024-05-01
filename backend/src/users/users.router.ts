import { Router } from "express";
import { usersController } from "./users.controller.js";

const usersRouter = Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:userId", usersController.getUserById);
usersRouter.patch("/:userId", usersController.updateUser);
usersRouter.post("/signup", usersController.signup);
usersRouter.post("/login", usersController.login);

export { usersRouter };
