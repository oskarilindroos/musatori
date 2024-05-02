import express from "express";
import morgan from "morgan";
import cors from "cors";
import { migrateToLatest } from "./db/migrator.js";
import { usersRouter } from "./users/users.router.js";
import { listingsRouter } from "./listings/listings.router.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ApiError } from "./errors/ApiError.js";

const app = express();

// Request body parser middleware
app.use(express.json());

// Logger middleware
// NOTE: Skip logging during tests
app.use(morgan("dev", { skip: () => process.env.NODE_ENV === "test" }));

// Cors middleware
const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];
app.use(
  cors({
    origin: origins,
  }),
);

// Migrate the database to the latest version
try {
  await migrateToLatest();
} catch (error) {
  console.error("Error while migrating database", error);
  process.exit(1);
}

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/listings", listingsRouter);

// For all other routes, return 404
app.use((_req, _res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Error handler middleware
app.use(errorHandler);

export { app };
