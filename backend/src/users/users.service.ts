import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
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
    const userExists = await usersRepository.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found");
    }

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

const login = async (username: string, password: string) => {
  try {
    const user = await usersRepository.getUserByUsername(username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    const jwtToken = createToken(user.id, user.username);
    return jwtToken;
  } catch (error) {
    throw error;
  }
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

// Creates a JWT token with the user id and username
// NOTE: Algorithm: HS256
const createToken = (userId: string, username: string) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not set");
    }

    return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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
