/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('auth', {
		id: 'id',
		/* TODO HOW TO ADD ID TO BE PRIMARY KEY, SERIAL */
		email: {
			type: 'text',
			notNull: true,
			// TODO this should be unique - add a nother migration for it
		},
		password: {
			type: 'text',
			notNull: false,
		},
		authType: {
			type: 'text',
			// TODO how to add constraint to be one of here
			notNull: true,
		},
		createdAt: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		editedAt: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: true,
			// TODO NOT SURE IF DEFAULT SHOULD BE HERE
			default: pgm.func('current_timestamp'),
		},
		lastLogin: {
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
