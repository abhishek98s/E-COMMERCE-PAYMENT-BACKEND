import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('images').del();
  await knex('images').insert([
    {
      product_id: 1,
      url: 'https://example.com/images/headphones.jpg',
      is_primary: true,
      alt_text: 'Wireless Headphones',
    },
    {
      product_id: 1,
      url: 'https://example.com/images/headphones-back.jpg',
      is_primary: false,
      alt_text: 'Headphones Back View',
    },

    {
      product_id: 2,
      url: 'https://example.com/images/smartphone.jpg',
      is_primary: true,
      alt_text: 'Smartphone Front',
    },
    {
      product_id: 2,
      url: 'https://example.com/images/smartphone-box.jpg',
      is_primary: false,
      alt_text: 'Smartphone Box',
    },

    {
      product_id: 3,
      url: 'https://example.com/images/laptop.jpg',
      is_primary: true,
      alt_text: 'Laptop Opened',
    },
    {
      product_id: 3,
      url: 'https://example.com/images/laptop-closed.jpg',
      is_primary: false,
      alt_text: 'Laptop Closed',
    },
  ]);
};
