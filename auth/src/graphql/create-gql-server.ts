// import { ContextFunction } from 'apollo-server-core';
import { ContextFunction } from 'apollo-server-core';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
// TODO remove apollo server package
import { PgApi, pgApiWrapper } from '../services/database/api/api';
import { MatchApi } from './data-sources/match-api';
import { PgDataSource } from './data-sources/pg-data-source';
import { PlayerApi } from './data-sources/player-api';
import { schema } from './schema/schema';
export interface GQLContextComplete extends GQLContext {
	dataSources: GQLDataSource;
}

export interface GQLContext {
	userAuth: {
		// TODO this is just for testing for now
		userId: number;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface GQLDataSource extends DataSources<object> {
	matchApi: MatchApi;
}

const contextGenerator: ContextFunction<ExpressContext> = ({ req, res }) => {
	// console.log({ req });
	return {
		userAuth: {
			userId: 1,
			firstName: 'Karlo',
			lastName: 'Marinović',
			email: 'test',
		},
	};
};

const dataSourcesGenerator = (pgApi: PgApi): GQLDataSource => {
	return {
		matchApi: new MatchApi(pgApi),
	};
};

export const createGQLServer = async () => {
	const pgApi = await pgApiWrapper();

	const server = new ApolloServer({
		schema: schema,
		// TODO this should be disabled in production
		// introspection: false,
		context: contextGenerator,
		dataSources: () => dataSourcesGenerator(pgApi),
		// TODO introspection wont work with datasources
		// dataSources: () => {
		// 	return {
		// 		// matchApi: new MatchApi(pgApi),
		// 		matchApi: new MatchApi(pgApi),
		// 		// matchApi: new PgDataSource(pgApi),
		// 	};
		// },
	});

	return server;
};

const DateTimeType = new GraphQLScalarType({
	name: 'DateTimeType',
});
