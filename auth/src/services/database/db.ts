import { Pool } from 'pg';
import { configs, ExecutionEnvironment } from './config';
// TODO maybe use env var to get env variables values
// const ENVIRONMENT = process.env.NODE_ENV

// type PgClient = ReturnType<typeof getPgClient>
// type PgClient = <>
// export type PoolQuery = PgClient['query'];
// export type PoolQuery = PgClient[""]
// export type PoolGetClient = PgClient['getClient'];

// type PgClientAsync <() => >

// TODO this is generic construcot

// type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
// type ReturnedPromiseResolvedType<T> = PromiseResolvedType<ReturnType<T>>

// TODO move this to constants somewhere
export type ReturnedPromiseResolvedType<T> = T extends (...args: unknown[]) => Promise<infer R>
	? R
	: never;

type PgClient = ReturnedPromiseResolvedType<typeof getPgClient>;
export type PoolQuery = PgClient['query'];
export type PoolGetClient = PgClient['getClient'];

export const getPgClient = async () => {
	const ENVIRONMENT = ExecutionEnvironment.DEVELOPMENT;
	const config = configs[ENVIRONMENT];
	const pool = new Pool(config);

	// TODO not sure here if return will be on T type
	const query = async <T>(query: string, params?: (string | number | boolean | null)[]) =>
		pool.query<T>(query, params);
	const getClient = async () => pool.connect();
	const endPool = async () => pool.end;
	const connectionString = config.connectionString;

	console.log('test');

	// const verifyConnection = async () => {
	// 	console.log('is this logged');
	// TODO test the connection
	const client = await getClient();

	// const client = await pool.connect();

	console.log('after client');

	const connectionTime = await client.query('select now();');
	client.release();
	// TODO this should be some kind of logger
	console.log(`Connected to PostgreSQL at ${connectionTime.rows[0].now}`);
	// };

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
		connectionString,
		// verifyConnection,
		// TODO add a function to migrate latest here
	};
};

// export const pgClient = getPgClient();
