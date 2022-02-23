/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('players', {
		id: 'id',
		auth_id: {
			// TODO this should be unsigned type
			type: 'integer',
			notNull: true,
			references: 'auth',
			onDelete: 'CASCADE',
		},

		first_name: {
			type: 'text',
			notNull: true,
		},
		last_name: {
			type: 'text',
			notNull: true,
		},
		nick: {
			type: 'text',
			notNull: true,
		},
		avatar_url: {
			type: 'text',
			notNull: false,
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
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('players', {
		ifExists: true,
		cascade: true,
	});
}
