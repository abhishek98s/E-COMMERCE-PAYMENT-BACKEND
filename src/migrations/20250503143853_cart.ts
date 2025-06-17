import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('carts', (table) => {
    table.increments('cart_id').primary();
    table
      .integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('carts');
}
