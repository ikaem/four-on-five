import { getPgClient } from '../db';
import { matchInitializeInsert } from './insert-data/match-initialize-insert';
import { matchPlayersAddInsert } from './insert-data/match-players-add-insert';
import { matchTeamsAddInsert } from './insert-data/match-teams-add-insert';
import { teamInitializeInsert } from './insert-data/team-initialize-insert';
import { userRegisterInsert } from './insert-data/user-register-insert';

const rows = parseInt(process.argv[3]) || 10;

const seedData = async (rows: number) => {
	console.log('inside');
	const { getClient, endPool } = getPgClient();

	try {
		await userRegisterInsert(getClient, rows);
		// TODO dont need rows here
		await teamInitializeInsert(getClient);
		await matchInitializeInsert(getClient);
		await matchTeamsAddInsert(getClient);
		await matchPlayersAddInsert(getClient);
	} catch (err) {
		console.error(err);
		// TODO not sure if process exist is correct
		process.exit(1);
	} finally {
		// TODO not sure if this will be reached if error
		await endPool();
	}
};

seedData(rows);
