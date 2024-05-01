import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Check if Authorization header is provided
  if (!req.header("Authorization")) {
    const error = new Error("Authorization header not provided");
    res.status(401);
    return next(error);
  }

  // Parse token from Authorization header
  // NOTE: Using schema: Bearer {token}
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    const error = new Error("Token not provided");
    res.status(401);
    return next(error);
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not set");
    }
    const jwtSecret = process.env.JWT_SECRET;

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Set the user object in res.locals
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
