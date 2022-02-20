import { Pool } from 'pg';
import migrate, { RunnerOption } from 'node-pg-migrate';
import { configs, ExecutionEnvironment } from './config';
import { resolve } from 'path';

// TODO move this to constants somewhere
export type ReturnedPromiseResolvedType<T> = T extends (...args: unknown[]) => Promise<infer R>
	? R
	: never;

// TODO no need for resolveing promise type bc funciton ot async right now
// type PgClient = ReturnedPromiseResolvedType<typeof getPgClient>;
type PgClient = ReturnType<typeof getPgClient>;
export type PoolQuery = PgClient['query'];
export type PoolGetClient = PgClient['getClient'];

export const getPgClient = () => {
	const ENVIRONMENT = ExecutionEnvironment.DEVELOPMENT;
	const config = configs[ENVIRONMENT];
	console.log('config', config);
	const pool = new Pool(config);

	// TODO not sure here if return will be on T type
	// TODO not sure if this can ever work?
	const query = async <T>(query: string, params?: (string | number | boolean | null)[]) =>
		await pool.query<T>(query, params);

	const getClient = async () => await pool.connect();
	const endPool = async () => await pool.end();
	const connectionString = config.connectionString;

	console.log('test');

	const verifyConnection = async () => {
		// 	console.log('is this logged');
		// TODO test the connection
		const client = await getClient();

		// const client = await pool.connect();

		console.log('after client');

		const connectionTime = await client.query('select now();');
		client.release();
		// TODO this should be some kind of logger
		console.log(`Connected to PostgreSQL at ${connectionTime.rows[0].now}`);
	};

	const migrateLatest = async () => {
		if (!connectionString) {
			console.error('Cannot do migrations');
			process.exit(1);
		}

		const options: RunnerOption = {
			// TODO this could be probably taken from env variable now
			databaseUrl: connectionString,
			migrationsTable: 'pgmigrations',
			// TODO not sure if this needs to be absolute
			dir: resolve(__dirname, 'migrations'),
			direction: 'up',
		};

		try {
			if (!connectionString) throw new Error('some error here');

			await migrate(options);
		} catch (err) {
			await migrate({
				...options,
				direction: 'down',
			});
			// TODO log error here
			console.error('Cannot do migrations', err);
			process.exit(1);
		}
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
		migrateLatest,
		connectionString,
		// TODO add a function to migrate latest here
	};
};

// export const pgClient = getPgClient();
