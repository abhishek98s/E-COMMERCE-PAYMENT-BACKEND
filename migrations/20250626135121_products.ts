import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('products');

  if (!exists) {
    await knex.schema.createTable('products', (table) => {
      table.increments('product_id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock_quantity').unsigned().defaultTo(0);
      table.string('image_url').notNullable();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('products');

  if (exists) {
    await knex.schema.dropTable('products');
  }
}
