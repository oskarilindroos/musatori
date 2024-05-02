import { Router } from "express";
import { usersController } from "./users.controller.js";
import { verifyToken } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/signup", usersController.signup);
usersRouter.post("/login", usersController.login);

usersRouter.get("/", verifyToken, usersController.getAllUsers);
usersRouter.get("/:userId", verifyToken, usersController.getUserById);
usersRouter.patch("/:userId", verifyToken, usersController.updateUser);

export { usersRouter };
