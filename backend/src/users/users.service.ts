import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { usersRepository } from "./users.repository.js";
import { UpdatedUser } from "../types/users.type.js";

const getAllUsers = async () => {
  try {
    const users = await usersRepository.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId: string) => {
  try {
    const user = await usersRepository.getUserById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: string, updatedUser: UpdatedUser) => {
  try {
    const user = await usersRepository.updateUser(userId, updatedUser);
    return user;
  } catch (error) {
    throw error;
  }
};

const signup = async (username: string, password: string) => {
  // Check if username is already in use
  try {
    const user = await usersRepository.getUserByUsername(username);
    if (user) {
      throw new Error("Username already in use");
    }
  } catch (error) {
    throw error;
  }

  // Create uuid for the user
  const id = uuidv4();

  // Hash and salt the password
  let hashedPassword = "";
  try {
    hashedPassword = await hashAndSaltPassword(password);
  } catch (error) {
    throw error;
  }

  // Insert user into the database
  try {
    const createdUser = await usersRepository.createUser({
      id,
      username,
      password: hashedPassword,
    });

    return {
      id: createdUser.id,
      username: createdUser.username,
      createdAt: createdUser.created_at,
    };
  } catch (error) {
    throw error;
  }
};

const login = async (email: string, password: string) => {
  //TODO: JWT logic
};

// Hashes and salts a plain text password
const hashAndSaltPassword = async (plainTextPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainTextPassword, salt);
  } catch (error) {
    throw error;
  }
};

export const usersService = {
  getAllUsers,
  getUserById,
  updateUser,
  signup,
  login,
};
