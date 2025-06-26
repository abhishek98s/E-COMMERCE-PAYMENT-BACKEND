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

export interface ITransactionProduct {
  product_id: string;
  quantity: number;
  price: number;
}

export interface ITransaction {
  transaction_id: string;
  total_amount: number;
  products: ITransactionProduct[];
}

export type TPayment = {
  user_id: number;
  amount: number;
} & Pick<ITransaction, 'transaction_id'>;

export type TPaymentDetail = {
  payment_id: number;
  user_id: number;
} & ITransactionProduct;
