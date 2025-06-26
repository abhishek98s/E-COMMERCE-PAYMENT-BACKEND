import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('products').del();
  await knex('products').insert([
    {
      name: 'Wireless Headphones',
      description: 'Noise-canceling over-ear headphones.',
      price: 99.99,
      stock_quantity: 50,
      image_url: 'https://cloudinary/image',
    },
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with great camera.',
      price: 699.99,
      stock_quantity: 20,
      image_url: 'https://cloudinary/image',
    },
    {
      name: 'Laptop',
      description: 'Lightweight laptop with 16GB RAM and SSD.',
      price: 1199.99,
      stock_quantity: 10,
      image_url: 'https://cloudinary/image',
    },
  ]);
};
