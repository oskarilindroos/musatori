import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("listings_types")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().notNull().autoIncrement(),
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db
    .insertInto("listings_types")
    .values([{ type: "Selling" }, { type: "Renting" }, { type: "Buying" }])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("listings_types").execute();
}
