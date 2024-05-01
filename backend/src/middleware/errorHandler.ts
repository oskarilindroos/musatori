import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // If status code is 200, set it to 500
  // Otherwise, use the existing status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = err.message || "Internal server error";
  res.status(statusCode);

  // If error is an sqlite error, send a generic error message instead
  if (err.stack?.includes("SqliteError")) {
    errorMessage = "Internal server error";
  }

  const errorResponse = {
    status: statusCode,
    message: errorMessage,
    // Only include the stack trace in development environment
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  };

  console.error(err);
  res.json(errorResponse);
};
