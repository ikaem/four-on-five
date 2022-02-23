import { getPgClient, PoolGetClient } from '../db';
import { insertMatches } from './insert-data/insert-matches';
import { insertPlayerMatchParticipations } from './insert-data/insert-player-match-participations';
import { insertTeams } from './insert-data/insert-teams';
import { insertUsers } from './insert-data/insert-users';
import { truncateData } from './truncate';

// TODO this whole folder should not go to docker - add to docker ignore

const seedMap: Record<string, (getClient: PoolGetClient, rows: number) => Promise<void>> = {
	users: insertUsers,
};

const dataType = process.argv[2];
const rows = parseInt(process.argv[3]) || 10;

const seedData = async () => {
	const { getClient, endPool } = getPgClient();

	// TODO testing
	try {
		await insertUsers(getClient, 10);
		await insertTeams(getClient);
		await insertMatches(getClient);
		await insertPlayerMatchParticipations(getClient);
	} catch (err) {
		console.error(err);
		// TODO not sure if process exist is correct
		process.exit(1);
	} finally {
		// TODO not sure if this will be reached if error
		await endPool();
	}
};

seedData();
