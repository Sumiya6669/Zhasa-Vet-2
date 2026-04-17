export type Category = 'medicines' | 'hygiene' | 'food' | 'accessories' | 'equipment';
export type AnimalTarget = 'cats' | 'dogs' | 'birds' | 'rodents' | 'all';

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  animal_types: AnimalTarget[];
  article: string;
  image_url: string;
  status: 'available' | 'preorder' | 'out_of_stock';
  is_featured?: boolean;
  reviews?: Review[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price_range: string;
  icon?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'completed' | 'cancelled';
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experience: string;
  image_url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image_url: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}
