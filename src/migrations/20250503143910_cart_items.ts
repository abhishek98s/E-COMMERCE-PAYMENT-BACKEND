import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cart_items', (table) => {
    table.increments('cart_item_id').primary();
    table
      .integer('cart_id')
      .unsigned()
      .references('carts.cart_id')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .unsigned()
      .references('products.product_id')
      .onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable().defaultTo(1);
    table.timestamps(true, true);

    table.index('cart_id');
    table.index('product_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cart_items');
}
