import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('roles');

  if (!exists) {
    await knex.schema.createTable('roles', (table) => {
      table.increments('role_id').primary();
      table.string('role_name', 50).notNullable().unique();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('roles');

  if (exists) {
    await knex.schema.dropTable('roles');
  }
}
