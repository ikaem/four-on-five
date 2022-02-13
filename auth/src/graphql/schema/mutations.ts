import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { userSignup } from './resolvers/mutations';
import { UserSignupInput } from './type-defs/inputs';
import { UserAuthType } from './type-defs/types';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		userSignup: {
			type: UserAuthType,
			args: {
				input: {
					type: new GraphQLNonNull(UserSignupInput),
				},
			},
			resolve: userSignup,
		},
	}),
});
