import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.increments('order_id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('SET NULL');
    table.string('status').notNullable().defaultTo('pending');
    table.decimal('total_price', 10, 2).notNullable();
    table.text('shipping_address');
    table.timestamps(true, true);

    table.check(
      `status IN ('pending', 'paid', 'shipped', 'delivered', 'canceled')`
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('orders');
}
