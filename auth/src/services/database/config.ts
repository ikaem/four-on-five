// import { Knex } from 'knex';

import { PoolConfig } from 'pg';

// // TODO this should be moved away from here
export enum ExecutionEnvironment {
	PRODUCTION = 'production',
	DEVELOPMENT = 'development',
	TESTING = 'testing',
}

// TODO testing this
export const connectionString =
	'postgresql://postgresUser:postgresPass@localhost:5432/four_on_five';

const defaultConfig: PoolConfig = {
	connectionString,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
};

export const configs: Record<ExecutionEnvironment, PoolConfig> = {
	// TODO htis needs setup
	development: {
		...defaultConfig,
	},
	production: {
		...defaultConfig,
	},
	testing: {
		...defaultConfig,
	},
};
