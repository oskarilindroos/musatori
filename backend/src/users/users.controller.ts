import { Request, Response } from "express";
import { usersService } from "./users.service.js";

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await usersService.getUserById(req.params.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.params.userId,
      req.body,
    );

    res.json(updatedUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const newUser = await usersService.signup(
      req.body.username,
      req.body.password,
    );

    res.status(201).json(newUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  //TODO:  Logic to login a user
};

export const usersController = {
  getAllUsers,
  getUserById,
  updateUser,
  signup,
  login,
};
