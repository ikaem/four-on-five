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
> = async (parent, { id }, { dataSources }) => {
	const me = await dataSources.matchApi.loadMatch(id);
	// const me = await dataSources.matchApi.loadMatches({ matchIds: [id] });
	console.log({ me });
	return me;
};
