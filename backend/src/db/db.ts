import { Database } from "../types/db.type.js";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
  database: new SQLite(process.env.DB_PATH),
});

export const db = new Kysely<Database>({
  dialect,
});
