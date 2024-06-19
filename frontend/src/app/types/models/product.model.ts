export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export interface ProductListItem {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}
