import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('auth', (table) => {
		table.text('password').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('auth', (table) => {
		table.dropColumn('password');
	});
}
