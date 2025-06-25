import knex from '../../config/knex.config';
import { IProduct } from './product.model';

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
