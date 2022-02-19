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
		// verifyConnection,
		connectionString,
	} = await getPgClient();

	// await verifyConnection();
	// TODO could maybe call some migraiton thing here, too

	// const getters = getGetters(query, getClient);
	const dbSetters = getDbSetters(query, getClient);
	const dbGetters = getDbGetters(query, getClient);

	return {
		// getters,
		dbSetters,
		dbGetters,
		connectionString,
	};
};
