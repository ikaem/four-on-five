import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const TeamType = new GraphQLObjectType({
	// how is this resolved?
	name: 'TeamType',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		creator: {
			// TODO player type does not exist yet
			type: new GraphQLNonNull(PlayerType),
			// resolve:
			// TODO would i need to resolve it here, or this will call resolver on the player type, whern we pass it
		},
	},
});
