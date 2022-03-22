import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserSignupInput } from './type-defs/inputs';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		userSignup: {
			type: GraphQLString,
			args: {
				input: {
					type: new GraphQLNonNull(UserSignupInput),
				},
			},
			resolve: () => 'hello',
		},
	}),
});
