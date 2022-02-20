/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('auth', {
		id: 'id',
		email: {
			type: 'text',
			notNull: true,
			unique: true,
		},
		password: {
			type: 'text',
			notNull: false,
		},
		auth_type: {
			type: 'text',
			// TODO how to add constraint to be one of here
			notNull: true,
		},
		created_at: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		edited_at: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: true,
			// TODO NOT SURE IF DEFAULT SHOULD BE HERE
			default: pgm.func('current_timestamp'),
		},
		last_login: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: false,
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('auth', {
		ifExists: true,
		cascade: true,
	});
}
