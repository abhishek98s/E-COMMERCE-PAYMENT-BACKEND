import knex from '../../config/knex.config';

export const fetchAll = () => {
  return knex
    .select('product_id', 'name', 'price', 'stock_quantity', 'description')
    .from('products');
};

export const fetchByProductId = (product_id: number) => {
  return knex
    .select('product_id', 'name', 'price', 'stock_quantity', 'description')
    .where('product_id', product_id)
    .from('products');
};
