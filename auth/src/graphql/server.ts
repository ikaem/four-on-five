// import { ContextFunction } from 'apollo-server-core';
import { ContextFunction } from 'apollo-server-core';
import { ApolloServer, Config, ExpressContext } from 'apollo-server-express';
import { setters } from '../services/database/controllers';
import { Setters } from '../services/database/controllers/setters';
import { schema } from './schema/schema';

export interface GQLContext {
	setters: Setters;
}

const contextGenerator: ContextFunction<ExpressContext, GQLContext> = async ({ req, res }) => {
	// TODO check auth token here first - have a helper function or something
	// maaaaybe find the user through the access token in db - means we would have to store the token inside the db every time

	return {
		setters,
	};
};

export const gqlServer = new ApolloServer({
	context: contextGenerator,
	schema: schema,
	// TODO this should be disabled in production
	// introspection: false,
});
