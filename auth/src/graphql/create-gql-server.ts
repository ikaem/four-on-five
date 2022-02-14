// import { ContextFunction } from 'apollo-server-core';
import { ContextFunction } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { pgApiWrapper } from '../services/database/api/api';
import { Setters } from '../services/database/api/setters';
import { schema } from './schema/schema';

export interface GQLContext {
	dbSetters: Setters;
}

export const createGQLServer = async () => {
	const { dbSetters } = await pgApiWrapper();
	const contextGenerator: ContextFunction<ExpressContext, GQLContext> = async ({ req, res }) => {
		// TODO check auth token here first - have a helper function or something
		// maaaaybe find the user through the access token in db - means we would have to store the token inside the db every time

		return {
			dbSetters,
			// getters: config.dbGetters,
		};
	};

	return new ApolloServer({
		context: contextGenerator,
		schema: schema,
		// TODO this should be disabled in production
		// introspection: false,
	});
};
