export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  category: string;
  type: string;
  user_id: string;
  username: string;
  created_at: Date;
  image_url: string;
}
