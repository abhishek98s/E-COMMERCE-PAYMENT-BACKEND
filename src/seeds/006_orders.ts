import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('orders').del();
  await knex('order_items').del();

  await knex('orders').insert([
    {
      user_id: 2,
      status: 'paid',
      total_price: 899.97,
      shipping_address: '123 Main St, Cityville',
    },
  ]);

  await knex('order_items').insert([
    {
      order_id: 1,
      product_id: 1,
      quantity: 2,
      price_at_time_of_purchase: 99.99,
    },
    {
      order_id: 1,
      product_id: 2,
      quantity: 1,
      price_at_time_of_purchase: 699.99,
    },
  ]);
};
