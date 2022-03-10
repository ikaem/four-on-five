/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('player_stats', {
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
	});
	pgm.createTable('team_stats', {
		id: 'id',
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
	});
	pgm.createTable('match_stats', {
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('player_stats', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('team_stats', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('match_stats', {
		ifExists: true,
		cascade: true,
	});
}
