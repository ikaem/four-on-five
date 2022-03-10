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

	pgm.createTable('players', {
		id: 'id',
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

	pgm.createTable('teams', {
		id: 'id',
		team_name: {
			type: 'text',
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
	});

	pgm.createTable('matches', {
		id: 'id',
		match_name: {
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('auth', {
		ifExists: true,
		cascade: true,
	});

	pgm.dropTable('players', {
		ifExists: true,
		cascade: true,
	});

	pgm.dropTable('teams', {
		ifExists: true,
		cascade: true,
	});
	pgm.dropTable('matches', {
		ifExists: true,
		cascade: true,
	});
}
