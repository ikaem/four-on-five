/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('player_info', {
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'player',
		},
	});
	pgm.createTable('team_info', {
		id: 'id',
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'team',
		},
	});
	pgm.createTable('match_info', {
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'match',
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('player_info', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('team_info', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('match_info', {
		ifExists: true,
		cascade: true,
	});
}
