/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.addConstraint('matches', 'matches_team_1_not_team_2', {
		check: 'team_1_id != team_2_id',
	});
	pgm.addConstraint('matches', 'matches_team_2_not_team_1', {
		check: 'team_2_id != team_1_id',
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropConstraint('matches', 'matches_team_1_not_team_2', {
		ifExists: true,
	});
	pgm.dropConstraint('matches', 'matches_team_2_not_team_1', {
		ifExists: true,
	});
}
