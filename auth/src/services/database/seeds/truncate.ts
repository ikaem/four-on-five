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
		await truncateTable('auth_player');
		await truncateTable('player_stats');

		await truncateTable('teams');
		await truncateTable('teams_stats');

		await truncateTable('matches');
		await truncateTable('match_stats');
		await truncateTable('team_match');
		await truncateTable('team_match');
		await truncateTable('player_match_participations');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
		await endPool();
	}
};

truncateData();
