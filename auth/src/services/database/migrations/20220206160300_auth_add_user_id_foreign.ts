import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('auth', (table) => {
		table.integer('user_id').references('users.id').unsigned().onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {}
