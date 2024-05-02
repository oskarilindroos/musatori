import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.js";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Custom errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Validation errors
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error", validationErrors: err.errors });
  }

  // All other errors
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};
