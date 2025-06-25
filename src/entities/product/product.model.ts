export interface IProduct {
  product_id?: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}
