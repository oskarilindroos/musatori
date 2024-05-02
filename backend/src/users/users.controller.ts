import { NextFunction, Request, Response } from "express";
import { usersService } from "./users.service.js";

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await usersService.getAllUsers();

    res.json(users);
  } catch (error: unknown) {
    return next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getUserById(req.params.userId);

    res.json(user);
  } catch (error: unknown) {
    return next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.params.userId,
      req.body,
    );

    res.json(updatedUser);
  } catch (error: unknown) {
    return next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await usersService.signup(
      req.body.username,
      req.body.password,
    );

    res.status(201).json(newUser);
  } catch (error: unknown) {
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await usersService.login(
      req.body.username,
      req.body.password,
    );

    res.json({ token: token });
  } catch (error: unknown) {
    return next(error);
  }
};

export const usersController = {
  getAllUsers,
  getUserById,
  updateUser,
  signup,
  login,
};
