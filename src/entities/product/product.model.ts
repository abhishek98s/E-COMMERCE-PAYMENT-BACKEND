interface IProduct {
  product_id?: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}
