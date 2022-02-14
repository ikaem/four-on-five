// import { Knex } from 'knex';

import { PoolConfig } from 'pg';

// // TODO this should be moved away from here
export enum ExecutionEnvironment {
	PRODUCTION = 'production',
	DEVELOPMENT = 'development',
	TESTING = 'testing',
}

const defaultConfig: PoolConfig = {
	host: 'localhost',
	database: 'four_on_five',
	user: 'postgresUser',
	password: 'postgresPass',
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

// // TODO this should come from env variables, and those should be provided later by kubernets config
// // this could be a function, so it does connect only after the server starts
// const defaultConfig: Knex.Config = {
// 	client: 'pg',
// 	connection: {
// 		database: 'four_on_five',
// 		// TODO should not use thze root user
// 		user: 'postgresUser',
// 		password: 'postgresPass',
// 	},
// 	// what are these pool options
// 	// https://stackoverflow.com/questions/4041114/what-is-database-pooling
// 	pool: {
// 		min: 2,
// 		max: 10,
// 	},
// 	// check knex migrations
// 	migrations: {
// 		tableName: 'knex_migrations',
// 		directory: 'migrations',
// 	},
// };

// const dbConfigs: Record<ExecutionEnvironment, Knex.Config> = {
// 	development: {
// 		...defaultConfig,
// 		debug: true,
// 	},
// 	// production will keep the same env variable names i guess
// 	production: defaultConfig,
// 	testing: {
// 		...defaultConfig,
// 		connection: {
// 			database: 'post-test',
// 			user: 'postgres',
// 			password: 'root',
// 		},
// 		pool: {
// 			min: 0,
// 			max: 10,
// 			idleTimeoutMillis: 500,
// 		},
// 	},
// };

// export { dbConfigs };
