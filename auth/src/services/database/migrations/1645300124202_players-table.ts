/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable('players', {
		id: 'id',
		authId: {
			// TODO this should be unsigned type
			type: 'integer',
			notNull: true,
			references: 'auth',
			onDelete: 'CASCADE',
		},

		firstName: {
			type: 'text',
			notNull: true,
		},
		lastName: {
			type: 'text',
			notNull: true,
		},
		nick: {
			type: 'text',
			notNull: true,
		},
		avatarUrl: {
			type: 'text',
			notNull: false,
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
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable('players', {
		ifExists: true,
		cascade: true,
	});
}
