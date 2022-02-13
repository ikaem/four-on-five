import { GraphQLFieldResolver } from 'graphql';
import { UserSignupArgs } from '../../../../services/database/api/setters';
import { GQLContext } from '../../../server';
import { UserAuthResponse } from '../../type-defs/types/user-auth-type';

export const userSignup: GraphQLFieldResolver<
	void,
	GQLContext,
	UserSignupArgs,
	Promise<UserAuthResponse>
> = async (_source, args, { setters }) => {
	// TODO google validation for inputs isnide resolvers

	const { id, firstName, lastName, email } = await setters.userSignup(args);
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
