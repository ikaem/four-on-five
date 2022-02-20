import {
	GraphQLFieldConfig,
	GraphQLFieldResolver,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	ThunkObjMap,
} from 'graphql';
import { UserSignupArgs } from '../../services/database/api/setters/user-signup';
import { GQLContext, GQLContextComplete } from '../create-gql-server';
// import { UserAuthResponse } from './type-defs/types/user-auth-type';

// TODO just define fields here as a function

const fields: ThunkObjMap<GraphQLFieldConfig<void, GQLContextComplete, { id: number }>> = () => ({
	helloWorld: {
		type: GraphQLString,
		resolve: async () => 'hello world',
	},
	getUsers: {
		type: new GraphQLList(GraphQLString),
		resolve: async (_source, args, context) => {},
	},
});

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields,
	// fields: () => ({
	// 	helloWorld: {
	// 		type: GraphQLString,
	// 		resolve: async () => 'hello world',
	// 	},
	// 	getUsers: {
	// 		type: new GraphQLList(GraphQLString),
	// 		resolve: async (_source, args, context) => {},
	// 	},
	// }),
});
