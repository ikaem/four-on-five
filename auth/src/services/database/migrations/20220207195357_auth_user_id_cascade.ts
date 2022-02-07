import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('auth', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id').onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('auth', (table) => {
		table.dropForeign('user_id');
		table.foreign('user_id').references('users.id');
	});
}
