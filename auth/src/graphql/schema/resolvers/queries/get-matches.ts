import { GraphQLFieldResolver } from 'graphql';
import { GQLContextComplete } from '../../../create-gql-server';

// TODO this is test only
interface getMatchesArgs {
	// this could be a string too, since using GQL ID
	ids: readonly number[];
}

// TODO move this elsewhere
export const getMatches: GraphQLFieldResolver<
	void,
	GQLContextComplete,
	getMatchesArgs,
	unknown
> = async (_parent, { ids }, { dataSources }) => {
	const matches = await dataSources.matchApi.loadMatches({ matchIds: ids });
	// const matches = await dataSources.matchApi.loadMatches({ matchIds: [id] });
	return matches;
};
