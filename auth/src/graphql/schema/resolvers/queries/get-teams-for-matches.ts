import { GraphQLFieldResolver } from 'graphql';
import { MatchModelAttributes } from '../../../../services/database/models/match';
import { GQLContextComplete } from '../../../create-gql-server';

// interface getMatchArgs {
// 	// this could be a string too, since using GQL ID
// 	id: number;
// }

// TODO move this elsewhere
export const getTeamsForMatches: GraphQLFieldResolver<
	// TODO this is probably MatchModel, and possibly an array of it
	MatchModelAttributes,
	GQLContextComplete,
	// TODO this is probably void
	void,
	unknown
> = async ({ id }, _args, { dataSources }) => {
	const teams = await dataSources.teamApi.loadTeamsForMatches({ matchIds: [id] });
	console.log({ teams });
	// console.log({ teams });
	// return teams;
	return teams;
};
