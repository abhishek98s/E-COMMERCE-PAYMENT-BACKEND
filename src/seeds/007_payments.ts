import { Knex } from 'knex';

exports.seed = async function (knex: Knex) {
  await knex('payments').del();
  await knex('payments').insert([
    {
      order_id: 1,
      final_price: 899.97,
      payment_status: 'successful',
    },
  ]);
};
