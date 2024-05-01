import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { migrateToLatest } from "./db/migrator.js";
import { usersRouter } from "./users/users.router.js";

const app = express();

// Load environment variables
dotenv.config();
app.use(express.json());
app.use(morgan("dev"));

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
