export interface NewListing {
  user_id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  listing_type_id: number;
  listing_category_id: number;
}

export interface UpdatedListing {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  listing_type_id?: number;
  listing_category_id?: number;
}
