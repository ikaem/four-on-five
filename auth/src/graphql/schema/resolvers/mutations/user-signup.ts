import { GraphQLFieldResolver } from 'graphql';
import { UserSignupArgs } from '../../../../services/database/api/setters/user-signup';
import { GQLContextComplete } from '../../../create-gql-server';
// import { UserAuthResponse } from '../../type-defs/types/user-auth-type';

interface UserAuthResponse {
	authId: number;
	accessToken: string;
}

export const userSignup: GraphQLFieldResolver<
	void,
	GQLContextComplete,
	UserSignupArgs,
	Promise<UserAuthResponse>
> = async (_source, args, { dataSources }) => {
	// TODO google validation for inputs isnide resolvers

	const { authId } = await dataSources.authApi.userSignup(args);
	// TODO not sure if should store access token to db, dont think i should
	const accessToken = 'test token';

	return {
		// 	id,
		// 	firstName,
		// 	lastName,
		// 	email,
		authId,
		accessToken,
	};
};
