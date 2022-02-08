import { Options } from 'sequelize/types';

// TODO move this to types somewhere
export enum ExecutionEnv {
	PRODUCTION = 'production',
	DEVELOPMENT = 'development',
	TESTING = 'testing',
}

// TODO I might have used incorrect type
export const dbConfigs: Record<ExecutionEnv, Options> = {
	development: {
		username: 'postgresUser',
		password: 'postgresPass',
		database: 'four_on_five',
		host: 'localhost',
		dialect: 'postgres',
	},
	testing: {
		username: 'root',
		password: 'pass',
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		username: 'root',
		password: 'pass',
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
};
