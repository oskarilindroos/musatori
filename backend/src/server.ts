import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { migrateToLatest } from "./db/migrator.js";
import { usersRouter } from "./users/users.router.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Load environment variables
dotenv.config();

// Request body parser middleware
app.use(express.json());

// Logger middleware
app.use(morgan("dev"));

// Cors middleware
const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];
app.use(
  cors({
    origin: origins,
  }),
);

const PORT = process.env.PORT || 5000;

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

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Environment:", process.env.NODE_ENV);
  console.log(`Server is running on port ${PORT}`);
});
