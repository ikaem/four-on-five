import { getPgClient, PoolGetClient } from '../db';
import { insertUsers } from './insert-data/insert-users';

// TODO this whole folder should not go to docker - add to docker ignore

const seedMap: Record<string, (getClient: PoolGetClient, rows: number) => Promise<void>> = {
	users: insertUsers,
};

const dataType = process.argv[2];
const rows = parseInt(process.argv[3]) || 10;

const seedData = async () => {
	const { getClient, endPool } = getPgClient();

	if (!dataType || !(dataType in seedMap)) {
		console.error('Need valid data type to insert');
		process.exit(1);
	}

	const seedHandler = seedMap[dataType];
	console.log('seed handler', seedHandler);

	await seedHandler(getClient, rows);

	await endPool();
};

seedData();
