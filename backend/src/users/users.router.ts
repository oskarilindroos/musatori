import { Router } from "express";
import { usersController } from "./users.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { loginSchema, signUpSchema } from "./users.schemas.js";
import { validate } from "../middleware/validate.js";

const usersRouter = Router();

usersRouter.post("/signup", validate(signUpSchema), usersController.signup);
usersRouter.post("/login", validate(loginSchema), usersController.login);
usersRouter.get("/", verifyToken, usersController.getAllUsers);
usersRouter.get("/:userId", verifyToken, usersController.getUserById);
usersRouter.patch("/:userId", verifyToken, usersController.updateUser);

export { usersRouter };
