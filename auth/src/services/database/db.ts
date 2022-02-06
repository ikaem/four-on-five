import Knex from 'knex';
import { Model } from 'objection';
import { dbConfigs, ExecutionEnvironment } from './config';

export const db = (environment: ExecutionEnvironment) => {
	const db = Knex(dbConfigs[environment]);

	return {
		connect() {
			Model.knex(db);
		},
		disconnect() {
			db.destroy();
		},
	};
};
