import knex from '../../config/knex.config';
import {
  IProduct,
  ITransaction,
  TPayment,
  TPaymentDetail,
} from './product.model';

export const fetchAll = () => {
  return knex
    .select(
      'product_id',
      'name',
      'price',
      'stock_quantity',
      'description',
      'image_url'
    )
    .from('products');
};

export const fetchByProductId = async (product_id: number) => {
  const result = await knex
    .select(
      'product_id',
      'name',
      'price',
      'stock_quantity',
      'description',
      'image_url'
    )
    .where('product_id', product_id)
    .from('products as p');

  return result[0];
};

export const create = async (product: IProduct) => {
  const result = await knex('products').insert(product).returning('product_id');
  return result[0];
};

export const createPayment = async (
  paymentDetail: TPayment
): Promise<number> => {
  const result = await knex('payments')
    .insert(paymentDetail)
    .returning('payment_id');
  const payment_id = result[0].payment_id;
  return payment_id;
};

export const createPaymentDetail = async (paymentDetail: TPaymentDetail) => {
  await knex('paymentDetails').insert(paymentDetail);
};
