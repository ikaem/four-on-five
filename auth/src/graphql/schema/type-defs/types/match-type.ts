import {
	GraphQLFieldConfig,
	GraphQLID,
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
import { TeamType } from './team-type';

export const MatchType = new GraphQLObjectType({
	// how is this resolved?
	name: 'MatchType',
	fields: getFields(),
	// fields: {
	// 	// resolver for these basic fields will be defined in the query here - this is top query anyhow?
	// 	id: {
	// 		type: new GraphQLNonNull(GraphQLID),
	// 	},
	// 	matchName: {
	// 		type: new GraphQLNonNull(GraphQLString),
	// 	},
	// 	description: {
	// 		type: new GraphQLNonNull(GraphQLString),
	// 	},
	// 	matchDate: {
	// 		type: new GraphQLNonNull(GraphQLString),
	// 		resolve: ({ matchDate }) => {
	// 			console.log({ matchDate });
	// 			return matchDate.toISOString();
	// 		},
	// 	},
	// },
	// resolveObject: () => {
	// 	console.log('here too');
	// },
	// this is object resolver
	// resolveObject: ()
	// TODO dont put other fields inside until is ready
});

// const test: Record<keyof MatchModelAttributes, > = {
// 	id: {},
// };

// TODO getMatchArgs could be args type here?
function getFields(): ThunkObjMap<GraphQLFieldConfig<MatchModelAttributes, any, any>> {
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
		// next is
		// TODO this should be careful
		// how do i access teams?
		// i should get the match id
		// then i should go into team model
		// and i should get all teams for match(es)
		teams: {
			// TODO this should be non null
			type: new GraphQLNonNull(TeamType),
		},
	};
}
