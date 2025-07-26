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
      'product_id as id',
      'name as title',
      'price',
      'image_url as image',
      'stock_quantity',
      'description',
    )
    .from('products');
};

export const fetchByProductId = async (product_id: number) => {
  const result = await knex
    .select(
      'product_id as id',
      'name as title',
      'price',
      'stock_quantity',
      'description',
      'image_url as image'
    )
    .where('product_id', product_id)
    .from('products as p');

  return result[0];
};

export const create = async (product: IProduct) => {
  const result = await knex('products').insert(product).returning('product_id');
  return result[0];
};

export const updateProduct = async (product: IProduct) => {
  const result = await knex('products')
    .update({
      name: product.name,
      price: product.price,
      stock_quantity: product.stock_quantity,
      description: product.description,
      image_url: product.image_url,
    })
    .where('product_id', product.product_id);
  return result;
};

export const deleteProduct = async (product_id: number) => {
  const result = await knex('products')
    .delete()
    .where('product_id', product_id);
  return result;
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
