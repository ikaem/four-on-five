import { GraphQLFieldResolver } from 'graphql';
import { GQLContextComplete } from '../../../create-gql-server';

interface getMatchArgs {
	// this could be a string too, since using GQL ID
	id: number;
}

// TODO move this elsewhere
export const getMatch: GraphQLFieldResolver<
	void,
	GQLContextComplete,
	getMatchArgs,
	unknown
> = async (_parent, { id }, { dataSources }) => {
	const match = await dataSources.matchApi.loadMatch(id);
	// const matches = await dataSources.matchApi.loadMatches({ matchIds: [id] });
	return match;
};
