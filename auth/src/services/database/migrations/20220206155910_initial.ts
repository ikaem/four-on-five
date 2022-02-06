import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('first_name', 45).notNullable();
		table.string('last_name', 45).notNullable();
		// TODO question if this will be updated every time
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}
