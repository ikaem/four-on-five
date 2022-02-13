import Knex from 'knex';
import { Model } from 'objection';
import { dbConfigs, ExecutionEnvironment } from './config';

function Database(environment: ExecutionEnvironment) {
	const dbInstance = Knex(dbConfigs[environment]);
	Model.knex(dbInstance);

	return {
		// TODO connecting straight here
		// connectModels() {
		// 	Model.knex(dbInstance);
		// },
		async migrateLatest() {
			await dbInstance.migrate.latest({
				directory: './src/services/database/migrations',
			});
		},
		disconnectDbInstance() {
			dbInstance.destroy();
		},
		dbInstance,
	};
}

// TODO need real env variables here
export const db = Database(ExecutionEnvironment.DEVELOPMENT);
