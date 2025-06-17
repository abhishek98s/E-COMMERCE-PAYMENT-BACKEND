import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('carts').del();
  await knex('cart_items').del();

  await knex('carts').insert([
    { user_id: 2 }, // Regular user's cart
  ]);

  await knex('cart_items').insert([
    { cart_id: 1, product_id: 1, quantity: 2 },
    { cart_id: 1, product_id: 2, quantity: 1 },
  ]);
};
