import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const PlayerType = new GraphQLObjectType({
	// how is this resolved?
	name: 'PlayerType',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
	},
	// TODO dont put other fields inside until is ready
});
