/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.addColumn('teams', {
		team_name: {
			type: 'text',
			notNull: true,
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropColumn('teams', 'team_name', {
		ifExists: true,
	});
}
