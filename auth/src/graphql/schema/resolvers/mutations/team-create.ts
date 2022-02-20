import { GraphQLFieldResolver, GraphQLTypeResolver } from 'graphql';
import { TeamCreateArgs } from '../../../../services/database/models/team';
import { GQLContextComplete } from '../../../create-gql-server';

interface TeamResponse {
	// TODO this is probably attributes
	// TODO but it is not really - it could also hold creator which is a full player
}

// TODO there is another type which is type resolver - how to resolve a type  - wghich one to use? GraphQLTypeResolver
// it probably jsut defineds how things are resolved?
export const teamCreate: GraphQLFieldResolver<
	void,
	GQLContextComplete,
	TeamCreateArgs,
	Promise<TeamResponse>
> = async (_source, args, { dataSources }) => {
	// TODO player type will probably need to be a type resolver or something? dunno
	const team = await dataSources.teamApi.teamCreate(args);

	return team;
};

// const me: GraphQLTypeResolver
