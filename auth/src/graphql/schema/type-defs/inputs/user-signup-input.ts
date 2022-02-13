import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { AuthTypeEnum } from '../enums';

export const UserSignupInput = new GraphQLInputObjectType({
	name: 'UserSignupInput',
	fields: () => ({
		firstName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		lastName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		email: {
			type: new GraphQLNonNull(GraphQLString),
		},
		password: {
			type: GraphQLString,
		},
		authType: {
			type: new GraphQLNonNull(AuthTypeEnum),
		},
	}),
});
