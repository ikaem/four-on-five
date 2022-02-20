// import { ContextFunction } from 'apollo-server-core';
import { ContextFunction } from 'apollo-server-core';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
// TODO remove apollo server package
import { pgApiWrapper } from '../services/database/api/api';
import { AuthApi } from './data-sources/auth-api';
import { DbGettersSource } from './data-sources/db-getters-source';
import { DbSettersSource } from './data-sources/db-setters-source';
import { PlayerApi } from './data-sources/player-api';
import { TeamApi } from './data-sources/team-api';
import { schema } from './schema/schema';

// 1. TODO one container that is called GQLContextContainer
// 2. one child is the actual context
// // 3. other child is the data sources
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
	// export interface GQLDataSource {
	// gettersSource: DbGettersSource;
	// settersSource: DbSettersSource;
	teamApi: TeamApi;
	playerApi: PlayerApi;
	authApi: AuthApi;
}

export const createGQLServer = async () => {
	const pgApi = await pgApiWrapper();
	const contextGenerator: ContextFunction<ExpressContext> = async ({ req, res }) => {
		// TODO check auth token here first - have a helper function or something
		// maaaaybe find the user through the access token in db - means we would have to store the token inside the db every time

		return {
			// dbSetters: pgApi.dbSetters,
			// dbGetters: pgApi.dbGetters,
			userAuth: {
				userId: 1,
				firstName: 'Karlo',
				lastName: 'Marinović',
				email: 'test',
			},
		};
	};

	const dataSourcesGenerator = (): GQLDataSource => {
		return {
			teamApi: new TeamApi(pgApi),
			playerApi: new PlayerApi(pgApi),
		};
	};

	const server = new ApolloServer({
		context: contextGenerator,
		schema: schema,
		// dataSources: dataSourcesGenerator,
		// TODO this should be disabled in production
		// introspection: false,
		// dataSources: () => ({
		// 	gettersSource: new DbGettersSource(pgApi),
		// 	settersSource: new DbSettersSource(pgApi),
		// }),
		dataSources: dataSourcesGenerator,
	});

	return server;
};
