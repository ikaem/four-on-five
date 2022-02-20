import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('matches', {
		id: 'id',
		organizer_id: {
			type: 'integer',
			notNull: false,
			references: 'players',
		},
		team_1_id: {
			type: 'integer',
			notNull: false,
			references: 'teams',
			// TODO this should be a reference to teams table
		},
		team_2_id: {
			type: 'integer',
			notNull: false,
			references: 'teams',
			// TODO this should be a reference to teams table
		},
		name: {
			type: 'text',
			notNull: true,
		},
		description: {
			type: 'text',
			notNull: false,
		},
		match_date: {
			type: 'timestamp',
			notNull: true,
		},
		location: {
			type: 'jsonb',
			notNull: true,
			// TODO this should be an array that holds two values only - or maybe a json object
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

	pgm.createTable('match_stats', {
		id: 'id',
		match_id: {
			type: 'integer',
			notNull: true,
			references: 'matches',
		},
		team_1_score: {
			type: 'integer',
			notNull: false,
		},
		team_2_score: {
			type: 'integer',
			notNull: false,
		},
		edited_at: {
			// TODO is datetime better?
			type: 'timestamp',
			notNull: true,
			// TODO NOT SURE IF DEFAULT SHOULD BE HERE
			default: pgm.func('current_timestamp'),
		},
	});

	pgm.createTable('player_match_participations', {
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
		team_id: {
			type: 'integer',
			notNull: false,
			references: 'teams',
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
	pgm.dropTable('matches');
	pgm.dropTable('match_stats');
	pgm.dropTable('player_match_participations');
}
