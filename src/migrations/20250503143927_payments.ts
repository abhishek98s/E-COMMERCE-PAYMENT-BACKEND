import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', (table) => {
    table.increments('payment_id').primary();
    table
      .integer('order_id')
      .unsigned()
      .references('orders.order_id')
      .onDelete('CASCADE');
    table.decimal('final_price', 10, 2).notNullable();
    table.string('payment_status').notNullable();
    table.timestamps(true, true);

    table.check(`payment_status IN ('successful', 'failed')`);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('payments');
}
