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
		await truncateTable('player');
		await truncateTable('player_auth');
		await truncateTable('player_info');

		await truncateTable('team');
		await truncateTable('team_info');
		await truncateTable('team_player_role');

		await truncateTable('match');
		await truncateTable('match_info');
		await truncateTable('match_player_role');

		await truncateTable('match_team');
		await truncateTable('match_player_team');
	} catch (err) {
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
		await endPool();
	}
};

truncateData();
