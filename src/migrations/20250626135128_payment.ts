import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('payments');

  if (!exists) {
    await knex.schema.createTable('payments', function (table) {
      table.increments('payment_id').primary(); // Primary key
      table.string('transaction_id').notNullable(); // ID from the payment gateway
      table.decimal('amount', 10, 2).notNullable(); // Total amount paid
      table
        .integer('user_id')
        .unsigned()
        .notNullable() // Foreign key referencing users table
        .references('user_id')
        .inTable('users') // Assuming the users table is named 'users'
        .onDelete('CASCADE'); // Optional: delete payments if user is deleted
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Created timestamp
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Updated timestamp
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('payments');

  if (exists) {
    await knex.schema.dropTable('payments'); // Corrected to 'payments'
  }
}
