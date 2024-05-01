import { Router } from "express";
import { usersController } from "./users.controller.js";
import { auth } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/signup", usersController.signup);
usersRouter.post("/login", usersController.login);

usersRouter.use(auth);
usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:userId", usersController.getUserById);
usersRouter.patch("/:userId", usersController.updateUser);

export { usersRouter };
