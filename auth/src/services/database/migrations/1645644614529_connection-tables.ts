/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('auth_player', {
		id: 'id',
		auth_id: {
			type: 'integer',
			notNull: true,
			references: 'auth',
		},
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
	});

	pgm.createTable('player_team_participations', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
	});

	pgm.createTable('team_match_participations', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
	});

	pgm.createTable('player_team_roles', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
		role: {
			type: 'string',
			notNull: true,
			// TODO this should one of some enum values
		},
	});

	pgm.createTable('player_match_roles', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
		role: {
			type: 'string',
			notNull: true,
			// TODO this should one of some enum values
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('auth_player', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('player_team_participations', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('team_match_participations', {
		ifExists: true,
		cascade: true,
	});
}
