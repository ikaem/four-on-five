import { ENVIRONMENT } from '../../../common';
import { ExecutionEnvironment } from '../config';
import { getPgClient, ReturnedPromiseResolvedType } from '../db';
import { getDbGetters } from './get-getters';
import { getDbSetters } from './get-setters';

// const

export type PgApi = ReturnedPromiseResolvedType<typeof pgApiWrapper>;

export const pgApiWrapper = async () => {
	const {
		query,
		getClient,
		// TODO test when do we close this
		// endPool,
		verifyConnection,
		migrateLatest,
		connectionString,
	} = getPgClient();

	await verifyConnection();
	// TODO get production node env
	if (ENVIRONMENT === ExecutionEnvironment.PRODUCTION) await migrateLatest();
	// TODO could maybe call some migraiton thing here, too

	// const getters = getGetters(query, getClient);
	const dbSetters = getDbSetters(query, getClient);
	const dbGetters = getDbGetters(query, getClient);

	return {
		dbSetters,
		dbGetters,
		connectionString,
	};
};
