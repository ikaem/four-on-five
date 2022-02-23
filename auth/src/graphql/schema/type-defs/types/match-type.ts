import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const MatchType = new GraphQLObjectType({
	// how is this resolved?
	name: 'MatchType',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
	},
	// TODO dont put other fields inside until is ready
});
