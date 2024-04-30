import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("listings_images")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().notNull().autoIncrement(),
    )
    .addColumn("listing_id", "integer", (col) => col.references("listings.id"))
    .addColumn("url", "text") // TODO: Add option for drag and drop image upload not just urls
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex("listing_image_listing_id_index")
    .on("listings_images")
    .column("listing_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("listings_images").execute();
}
