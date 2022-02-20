/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('teams', {
		id: 'id',
		creator_id: {
			type: 'integer',
			references: 'players',
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
	pgm.dropTable('teams');
}
