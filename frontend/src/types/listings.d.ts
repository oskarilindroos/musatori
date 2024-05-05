export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number | null;
  category: string;
  type: string;
  user_id: string;
  username: string;
  created_at: Date;
  image_url: string;
}

export interface NewListing {
  title: string;
  description: string;
  location: string;
  price: number | null;
  listing_type_id: number;
  listing_category_id: number;
  imageUrls: string[];
}

export interface ListingDetails {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number | null;
  category: string;
  type: string;
  user_id: string;
  username: string;
  email: string;
  created_at: Date;
  images: Image[];
}

export interface Image {
  id: number;
  url: string;
}
