import { GraphQLList } from 'graphql';
import {
	GraphQLFieldConfig,
	GraphQLFieldResolver,
	GraphQLID,
	GraphQLNonNull,
	GraphQLObjectType,
	ThunkObjMap,
} from 'graphql';
import { MatchesGetArgs } from '../../services/database/api/getters/matches-get';
import { MatchModelAttributes } from '../../services/database/models/match';
import { GQLContextComplete } from '../create-gql-server';
import { getMatch } from './resolvers/queries';
import { MatchType } from './type-defs/types/match-type';
// const fields: ThunkObjMap<GraphQLFieldConfig<void, GQLContextComplete, { id: number }>> = () => ({
// 	helloWorld: {
// 		type: GraphQLString,
// 		resolve: async () => 'hello world',
// 	},
// 	getUsers: {
// 		type: new GraphQLList(GraphQLString),
// 		resolve: async (_source, args, context) => {},
// 	},
// });

const fields: ThunkObjMap<GraphQLFieldConfig<void, GQLContextComplete>> = () => ({
	getMatch: {
		// TODO this should be nullable for some reason - check notes to see why
		type: MatchType,
		// type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MatchType))),
		args: {
			id: {
				// TODO this should be a number or int, as an argument?
				type: new GraphQLNonNull(GraphQLID),
			},
			// matchName
		},
		// ok, this is field resolver
		resolve: getMatch,
	},
});

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields,
});
