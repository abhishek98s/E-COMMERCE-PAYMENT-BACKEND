import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('images', (table) => {
    table.increments('image_id').primary();
    table
      .integer('product_id')
      .unsigned()
      .references('products.product_id')
      .onDelete('CASCADE');
    table.text('url').notNullable();
    table.text('alt_text');
    table.boolean('is_primary').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('images');
}
