import { ExecutionEnvironment } from '../config';
import { pgClient } from '../db';
import { getSetters } from './setters';

// const

const pgApiWrapper = async (environment: ExecutionEnvironment) => {
	// const { query, getClient } = await getPgClient(environment);

	const {
		query,
		getClient,
		// TODO test when do we close this
		// endPool,
		verifyConnection,
	} = pgClient;

	await verifyConnection();

	// const getters = getGetters(query, getClient);
	const setters = getSetters(query, getClient);

	return {
		// getters,
		setters,
	};
};
