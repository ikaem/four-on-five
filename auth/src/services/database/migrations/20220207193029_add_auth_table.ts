import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('auth', (table) => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable().references('users.id');
		table.text('auth_type').notNullable();
		table.text('email').notNullable().unique();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('auth');
}
