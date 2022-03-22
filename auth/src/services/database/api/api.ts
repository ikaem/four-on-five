import { ENVIRONMENT } from '../../../common';
import { ExecutionEnvironment } from '../config';
import { getPgClient, ReturnedPromiseResolvedType } from '../db';
import { getGetters } from './get-getters';
import { getSetters } from './get-setters';

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
	const setters = getSetters(query, getClient);
	const getters = getGetters(query, getClient);

	return {
		setters,
		getters,
		connectionString,
	};
};
