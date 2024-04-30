import { Database } from "../types/db.type.ts";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
  database: new SQLite("musatori_db.sqlite"),
});

export const db = new Kysely<Database>({
  dialect,
});
