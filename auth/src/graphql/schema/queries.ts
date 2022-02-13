import { GraphQLObjectType, GraphQLString } from 'graphql';

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		helloWorld: {
			type: GraphQLString,
			resolve: async () => 'hello world',
		},
	}),
});
