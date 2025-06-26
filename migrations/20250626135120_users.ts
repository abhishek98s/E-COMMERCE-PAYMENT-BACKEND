import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('users');

  if (!exists) {
    await knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table
        .integer('role_id')
        .unsigned()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('users');

  if (exists) {
    await knex.schema.dropTable('users');
  }
}
