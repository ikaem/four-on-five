import { GraphQLFieldResolver } from 'graphql';
import { UserSignupArgs } from '../../../../services/database/api/setters/user-signup';
import { GQLContext } from '../../../create-gql-server';
import { UserAuthResponse } from '../../type-defs/types/user-auth-type';

export const userSignup: GraphQLFieldResolver<
	void,
	GQLContext,
	UserSignupArgs,
	Promise<UserAuthResponse>
> = async (_source, args, { dbSetters }) => {
	// TODO google validation for inputs isnide resolvers

	const { id, firstName, lastName, email } = await dbSetters.userSignup(args);
	// TODO not sure if should store access token to db, dont think i should
	const accessToken = 'test token';

	return {
		id,
		firstName,
		lastName,
		email,
		accessToken,
	};
};
