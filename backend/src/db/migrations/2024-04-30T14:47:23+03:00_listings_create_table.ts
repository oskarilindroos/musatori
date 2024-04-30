import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("listings")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().notNull().autoIncrement(),
    )
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("price", "real")
    .addColumn("location", "text", (col) => col.notNull())
    .addColumn("user_id", "text", (col) =>
      col.references("users.id").onDelete("cascade").notNull(),
    )
    .addColumn("listing_type_id", "integer", (col) =>
      col.references("listing_types.id").onDelete("cascade").notNull(),
    )
    .addColumn("listing_category_id", "integer", (col) =>
      col.references("listing_categories.id").onDelete("cascade").notNull(),
    )
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex("listing_user_id_index")
    .on("listings")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("listing_listing_type_id_index")
    .on("listings")
    .column("listing_type_id")
    .execute();

  await db.schema
    .createIndex("listing_listing_category_id_index")
    .on("listings")
    .column("listing_category_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("listings").execute();
}
