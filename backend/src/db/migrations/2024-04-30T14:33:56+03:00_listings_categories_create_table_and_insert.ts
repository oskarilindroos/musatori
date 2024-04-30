import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("listings_categories")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().notNull().autoIncrement(),
    )
    .addColumn("category", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db
    .insertInto("listings_categories")
    .values([
      { category: "Guitars", description: "Guitars and basses" },
      { category: "Basses", description: "Basses" },
      { category: "Drums", description: "Drums and percussion" },
      { category: "Keyboards", description: "Keyboards and pianos" },
      {
        category: "Synthesizers",
        description: "Synthesizers and workstations",
      },
      { category: "Studio equipment", description: "Studio equipment" },
      { category: "DJ equipment", description: "DJ equipment" },
      { category: "Microphones", description: "Microphones" },
      { category: "PA systems", description: "PA systems" },
      {
        category: "Strings",
        description: "String instruments and accessories",
      },
      {
        category: "Wind instruments",
        description: "Wind instruments and accessories",
      },
      { category: "Amplifiers", description: "Amplifiers and cabinets" },
      { category: "Pedals", description: "Pedals and effects" },
      { category: "Cases", description: "Cases and bags" },
      {
        category: "Accessories",
        description: "Accessories (cables, stands, etc.)",
      },
      { category: "Other", description: "Other music gear" },
    ])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("listings_categories").execute();
}
