import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('order_item_id').primary();
    table
      .integer('order_id')
      .unsigned()
      .references('orders.order_id')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .references('products.product_id')
      .onDelete('SET NULL');
    table.integer('quantity').unsigned().notNullable();
    table.decimal('price_at_time_of_purchase', 10, 2).notNullable();
    table.timestamps(true, true);

    table.index('order_id');
    table.index('product_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('order_items');
}
