import { Pool } from 'pg';
import { configs, ExecutionEnvironment } from './config';
// TODO maybe use env var to get env variables values
// const ENVIRONMENT = process.env.NODE_ENV

export type PoolQuery = typeof pgClient.query;
export type PoolGetClient = typeof pgClient.getClient;

const getPgClient = () => {
	const ENVIRONMENT = ExecutionEnvironment.DEVELOPMENT;
	const pool = new Pool(configs[ENVIRONMENT]);

	const query = async (query: string, params?: (string | number | boolean | null)[]) =>
		pool.query(query, params);
	const getClient = async () => pool.connect();
	const endPool = async () => pool.end;

	console.log('test');

	const verifyConnection = async () => {
		console.log('is this logged');
		// TODO test the connection
		const client = await getClient();

		// const client = await pool.connect();

		console.log('after client');

		const connectionTime = await client.query('select now();');
		client.release();
		// TODO this should be some kind of logger
		console.log(`Connected to PostgreSQL at ${connectionTime.rows[0].now}`);
	};

	pool.on('error', (err) => {
		// TODO not sure if this catches anything really - what does it catch
		// TODO this should be logged proper
		// also, this should catch the connection test error if any
		console.error('Unexpected PG client error', err);
		process.exit(1);
	});

	return {
		query,
		getClient,
		// TODO test when do we close this?
		endPool,
		verifyConnection,
		// TODO add a function to migrate latest here
	};
};

export const pgClient = getPgClient();
