import { pgClient } from '../db';
import { getDbSetters } from './setters';

// const

export const pgApiWrapper = async () => {
	const {
		query,
		getClient,
		// TODO test when do we close this
		// endPool,
		verifyConnection,
	} = pgClient;

	await verifyConnection();

	// const getters = getGetters(query, getClient);
	const dbSetters = getDbSetters(query, getClient);

	return {
		// getters,
		dbSetters,
	};
};
