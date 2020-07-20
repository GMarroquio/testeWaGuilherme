import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Orders', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');
    table.string('description', 50).notNullable();
    table.float('price', 2).nullable();
    table.integer('amount').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Orders');
}
