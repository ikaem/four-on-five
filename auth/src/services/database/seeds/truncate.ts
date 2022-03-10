import { getPgClient } from '../db';

export const truncateData = async () => {
	const { getClient, endPool } = getPgClient();

	const client = await getClient();

	const truncateTable = async (tableName: string) => {
		const query = `
			truncate table ${tableName} cascade;
		`;

		await client.query(query);
	};

	// TODO testing
	try {
		await truncateTable('auth');
		await truncateTable('players');
		await truncateTable('player_auth');
		await truncateTable('player_stats');

		await truncateTable('teams');
		await truncateTable('team_stats');
		await truncateTable('team_player_roles');

		await truncateTable('matches');
		await truncateTable('match_stats');
		await truncateTable('match_player_roles');

		await truncateTable('match_teams');
		await truncateTable('match_players');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
		await endPool();
	}
};

truncateData();
