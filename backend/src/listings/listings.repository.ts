import { db } from "../db/db.js";
import { NewListing, UpdatedListing } from "../types/listings.type.js";

const createListing = async (newListing: NewListing) => {
  return await db
    .insertInto("listings")
    .values(newListing)
    .returning("id")
    .executeTakeFirst();
};

const deleteListing = async (listingId: number) => {
  return await db.deleteFrom("listings").where("id", "=", listingId).execute();
};

const updateListing = async (
  listingId: number,
  updatedListing: UpdatedListing,
) => {
  return await db
    .updateTable("listings")
    .set(updatedListing)
    .where("id", "=", listingId)
    .returning("id")
    .executeTakeFirst();
};

const getAllListings = async () => {
  return await db
    .selectFrom("listings")
    .innerJoin("users", "listings.user_id", "users.id")
    .innerJoin(
      "listings_categories",
      "listings.listing_category_id",
      "listings_categories.id",
    )
    .innerJoin(
      "listings_types",
      "listings.listing_type_id",
      "listings_types.id",
    )
    .innerJoin("listings_images", "listings.id", "listings_images.listing_id")
    .select([
      "listings.id as id",
      "listings.title",
      "listings.description",
      "listings.location",
      "listings.price",
      "listings_categories.category",
      "listings_types.type",
      "users.id as user_id",
      "users.username",
      "listings.created_at",
      "listings_images.url as image_url",
    ])
    .groupBy("listings.id")
    .orderBy("listings.created_at", "desc")
    .execute();
};

const getAllListingsCategories = async () => {
  return await db.selectFrom("listings_categories").selectAll().execute();
};

const getAllListingsTypes = async () => {
  return await db.selectFrom("listings_types").selectAll().execute();
};

const getListingById = async (listingId: number) => {
  return await db
    .selectFrom("listings")
    .innerJoin("users", "listings.user_id", "users.id")
    .innerJoin(
      "listings_categories",
      "listings.listing_category_id",
      "listings_categories.id",
    )
    .innerJoin(
      "listings_types",
      "listings.listing_type_id",
      "listings_types.id",
    )
    .select([
      "listings.id as id",
      "listings.title",
      "listings.description",
      "listings.location",
      "listings.price",
      "listings_categories.category",
      "listings_types.type",
      "users.id as user_id",
      "users.username",
      "listings.created_at",
    ])
    .where("listings.id", "=", listingId)
    .executeTakeFirst();
};

const getListingImages = async (listingId: number) => {
  return await db
    .selectFrom("listings_images")
    .where("listing_id", "=", listingId)
    .select(["id", "url"])
    .execute();
};

const createListingImage = async (listingId: number, imageUrl: string) => {
  return await db
    .insertInto("listings_images")
    .values({ listing_id: listingId, url: imageUrl })
    .execute();
};

export const listingsRepository = {
  createListing,
  deleteListing,
  updateListing,
  getAllListings,
  getListingById,
  getAllListingsCategories,
  getAllListingsTypes,
  getListingImages,
  createListingImage,
};
