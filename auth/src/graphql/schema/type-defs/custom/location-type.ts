import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const LocationType = new GraphQLObjectType({
	name: 'LocationType',
	description: 'Latitude and longitude for a location',
	fields: {
		latitude: {
			type: new GraphQLNonNull(GraphQLString),
		},
		longitude: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
});
