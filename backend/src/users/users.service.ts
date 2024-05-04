import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usersRepository } from "./users.repository.js";
import { JwtUser, UpdatedUser } from "../types/users.type.js";
import { ApiError } from "../errors/ApiError.js";

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

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: string, updatedUser: UpdatedUser) => {
  try {
    const userExists = await usersRepository.getUserById(userId);
    if (!userExists) {
      throw new ApiError(404, "User not found");
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
      throw new ApiError(409, "Username is already in use");
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

    return createdUser;
  } catch (error) {
    throw error;
  }
};

const login = async (username: string, password: string) => {
  try {
    const user = await usersRepository.getUserByUsername(username);
    if (!user) {
      throw new ApiError(401, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid username or password");
    }

    const jwtUser: JwtUser = {
      id: user.id,
      username: user.username,
      admin: user.admin || 0,
    };

    // Create a JWT token
    const jwtToken = createToken(jwtUser);

    // Return the user and token
    return { user: jwtUser, token: jwtToken };
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
const createToken = (user: JwtUser) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not set");
    }

    return jwt.sign(user, process.env.JWT_SECRET, {
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
  hashAndSaltPassword,
};
