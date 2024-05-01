import express from "express";
import { migrateToLatest } from "./db/migrator.js";
import { db } from "./db/db.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

await migrateToLatest();

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", async (_, res) => {
  const users = await db.selectFrom("users").selectAll().execute();
  res.json(users);
});

app.get("/api/listings/categories", async (_, res) => {
  const categories = await db
    .selectFrom("listings_categories")
    .selectAll()
    .execute();
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
