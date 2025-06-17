import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table
      .integer('role_id')
      .unsigned()
      .references('roles.role_id')
      .onDelete('SET NULL');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
