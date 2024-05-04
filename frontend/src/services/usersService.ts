import axios from "axios";
import { AuthUser, User } from "../types/users";

const signUp = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/users/signup", {
      username,
      password,
    });

    const createdUser: User = response.data;

    return createdUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign up.");
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/users/login", {
      username,
      password,
    });

    const { user, token } = response.data;

    // Create an AuthUser object from the response
    const authUser: AuthUser = {
      isLoggedIn: true,
      isAdmin: Boolean(user.admin),
      userId: user.id,
      userName: user.username,
      token: token,
    };

    return authUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign in.");
  }
};

const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users: User[] = response.data;
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }
};

const getUserById = async (id: string, token: string) => {
  try {
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user: User = response.data;
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user.");
  }
};

export const usersService = {
  signUp,
  login,
  getAllUsers,
  getUserById,
};
