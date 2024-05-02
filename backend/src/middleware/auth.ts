import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";
import { AuthenticatedUser } from "../types/users.type.js";

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  // Check if Authorization header is provided
  if (!req.header("Authorization")) {
    const error = new ApiError(401, "Authorization header not provided");
    return next(error);
  }

  // Parse token from Authorization header
  // NOTE: Using schema: Bearer {token}
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    const error = new ApiError(401, "Token not provided");
    return next(error);
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not set");
    }
    const jwtSecret = process.env.JWT_SECRET;

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the user to the request object
    req.user = decoded as AuthenticatedUser;

    next();
  } catch (error) {
    next(new ApiError(401, "Invalid token"));
  }
};
