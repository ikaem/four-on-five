import { Pool } from 'pg';
import { configs, ExecutionEnvironment } from './config';

export type PoolQuery = typeof pgClient.query;
export type PoolGetClient = typeof pgClient.getClient;

const getPgClient = (environment: ExecutionEnvironment) => {
	const pool = new Pool(configs[environment]);

	const query = pool.query;
	const getClient = pool.connect;
	const endPool = pool.end;

	const verifyConnection = async () => {
		// TODO test the connection
		const client = await getClient();
		const connectionTime = await client.query('select now();');
		client.release();
		// TODO this should be some kind of logger
		console.log(`
			Connected to PostgreSQL at ${connectionTime.rows[0]}
		`);
	};

	pool.on('error', (err) => {
		// TODO this should be logged proper
		// also, this should catch the connection test error if any
		console.error('Unexpected PG client error', err);
		process.exit(1);
	});

	return {
		query,
		getClient,
		// TODO test when do we close this
		endPool,
		verifyConnection,
	};
};

export const pgClient = getPgClient(ExecutionEnvironment.DEVELOPMENT);

// // TODO this will need to come from some env variable
// const pool = new Pool(configs[ExecutionEnvironment.DEVELOPMENT]);

// export const db = {
// 	// TODO i could make this a method that actually makes a query
// 	query: pool.query,
// 	getClient: pool.connect,
// };

// import Knex from 'knex';
// import { Model } from 'objection';
// import { dbConfigs, ExecutionEnvironment } from './config';

// function Database(environment: ExecutionEnvironment) {
// 	const dbInstance = Knex(dbConfigs[environment]);
// 	Model.knex(dbInstance);

// 	return {
// 		// TODO connecting straight here
// 		// connectModels() {
// 		// 	Model.knex(dbInstance);
// 		// },
// 		async migrateLatest() {
// 			await dbInstance.migrate.latest({
// 				directory: './src/services/database/migrations',
// 			});
// 		},
// 		disconnectDbInstance() {
// 			dbInstance.destroy();
// 		},
// 		dbInstance,
// 	};
// }

// // TODO need real env variables here
// export const db = Database(ExecutionEnvironment.DEVELOPMENT);
