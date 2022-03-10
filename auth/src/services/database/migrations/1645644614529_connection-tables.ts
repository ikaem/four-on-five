/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('player_auth', {
		id: 'id',
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		auth_id: {
			type: 'integer',
			notNull: true,
			references: 'auth',
		},
	});

	pgm.createTable('match_teams', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
		// a field for is team home , or something like that
		// proably osme check constraint to make sure that if team id is already in for match id, dont allow
	});

	pgm.createTable('match_players', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		match_team_id: {
			type: 'integer',
			notNull: false,
			references: 'match_teams',
		},
		// TODO probably some ccheck constaraint to make sure that if player id already exists for a match team id, dont allow it
	});

	pgm.createTable('team_player_roles', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		team_id: {
			type: 'integer',
			notNull: true,
			references: 'teams',
		},
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		role: {
			type: 'string',
			notNull: true,
			// TODO this should one of some enum values
		},
	});

	pgm.createTable('match_player_roles', {
		// TODO maybe add more fields here later for stats
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
		player_id: {
			type: 'integer',
			notNull: true,
			references: 'players',
		},
		role: {
			type: 'string',
			notNull: true,
			// TODO this should one of some enum values
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('player_auth', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('match_teams', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('match_players', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('team_player_roles', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('match_player_roles', {
		ifExists: true,
		cascade: true,
	});
}
