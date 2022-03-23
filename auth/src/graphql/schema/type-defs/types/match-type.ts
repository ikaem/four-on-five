import {
	GraphQLFieldConfig,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	ThunkObjMap,
} from 'graphql';
import { DateTime } from 'graphql-scalars/typeDefs';
import { MatchModelAttributes } from '../../../../services/database/models/match';
import { GQLContextComplete } from '../../../create-gql-server';
import { getTeamsForMatches } from '../../resolvers/queries';
import { DateTimeScalar } from '../custom/date-time-scalar';
import { LocationType } from '../custom/location-type';
import { TeamType } from './team-type';

export const MatchType = new GraphQLObjectType({
	// TODO put description here too
	name: 'MatchType',
	fields: getFields(),
});

// TODO getMatchArgs could be args type here?
// TODO type this generics too, everywhere
function getFields(): ThunkObjMap<GraphQLFieldConfig<any, any, any>> {
	// resolver for these basic fields will be defined in the query here - this is top query anyhow?
	return {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		matchName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		description: {
			type: new GraphQLNonNull(GraphQLString),
		},
		matchDate: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		location: {
			type: new GraphQLNonNull(LocationType),
		},
		createdAt: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		editedAt: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		teams: {
			// TODO this should be non null
			type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TeamType))),
			// resolve: (parent) => {
			// 	console.log({ parent });
			// 	return [
			// 		{
			// 			id: 'test',
			// 		},
			// 	];
			// },
			resolve: getTeamsForMatches,
		},
	};
}
