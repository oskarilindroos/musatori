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
