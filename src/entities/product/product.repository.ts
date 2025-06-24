import knex from '../../config/knex.config';

export const fetchAll = () => {
  return knex
    .select(
      'products.product_id',
      'name',
      'price',
      'stock_quantity',
      'description',
      'images.url as image'
    )
    .from('products')
    .leftJoin('images', 'products.product_id', 'images.product_id');
};

export const fetchByProductId = async (product_id: number) => {
  const result = await knex
    .select(
      'p.product_id',
      'name',
      'price',
      'stock_quantity',
      'description',
      knex.raw('array_agg(images.url) AS image_urls')
    )
    .where('p.product_id', product_id)
    .from('products as p')
    .leftJoin('images', 'p.product_id', 'images.product_id')
    .groupBy('p.product_id', 'p.name', 'p.description');

  return result[0];
};

export const create = async (product: IProduct) => {
  const result = await knex('products').insert(product).returning('product_id');
  return result[0];
};