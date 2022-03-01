import { getPgClient } from '../db';
import { userRegisterInsert } from './insert-data/user-register-insert';

const rows = parseInt(process.argv[3]) || 10;

const seedData = async (rows: number) => {
	console.log('inside');
	const { getClient, endPool } = getPgClient();

	try {
		await userRegisterInsert(getClient, rows);

		// await insertAuthPlayer(getClient, rows);
		// await insertUsers(getClient, rows);
		// await insertTeams(getClient);
		// await insertMatches(getClient);
		// await insertPlayerMatchParticipations(getClient);
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
