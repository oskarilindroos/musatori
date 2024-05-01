import express from "express";
import { migrateToLatest } from "./db/migrator.js";

const app = express();
app.use(express.json());

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
