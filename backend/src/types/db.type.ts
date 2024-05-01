import { Generated, Selectable } from "kysely";

export interface Database {
  users: UsersTable;
  listings: ListingsTable;
  listings_categories: ListingsCategoriesTable;
  listings_types: ListingsTypesTable;
  listings_images: ListingsImagesTable;
}

export interface UsersTable {
  id: string;
  username: string;
  email: string;
  password: string;
  admin: boolean | null;
  created_at: Generated<string>;
}

export interface ListingsTable {
  id: number;
  title: string;
  description: string;
  price: number | null;
  location: string;
  user_id: string;
  listing_type_id: number;
  listing_category_id: number;
  created_at: Generated<string>;
}

export interface ListingsCategoriesTable {
  id: number;
  category: string;
}

export interface ListingsTypesTable {
  id: number;
  type: string;
}

export interface ListingsImagesTable {
  id: number;
  listing_id: number;
  url: string;
}

export type User = Selectable<UsersTable>;
export type Listing = Selectable<ListingsTable>;
export type ListingCategory = Selectable<ListingsCategoriesTable>;
export type ListingType = Selectable<ListingsTypesTable>;
export type ListingImage = Selectable<ListingsImagesTable>;
