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
import { DateTimeScalar } from '../custom/date-time-scalar';
import { LocationType } from '../custom/location-type';
import { MatchType } from './match-type';

export const TeamType = new GraphQLObjectType({
	// TODO put description here too
	name: 'TeamType',
	fields: getFields(),
});

// TODO getMatchArgs could be args type here?
function getFields(): ThunkObjMap<GraphQLFieldConfig<any, any, any>> {
	// resolver for these basic fields will be defined in the query here - this is top query anyhow?
	return {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		teamName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		createdAt: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		editedAt: {
			type: new GraphQLNonNull(DateTimeScalar),
		},
		// matches: {
		// 	type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MatchType))),
		// },
	};
}
