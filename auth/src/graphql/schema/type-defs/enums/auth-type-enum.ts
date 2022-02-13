import { GraphQLEnumType } from 'graphql';

export const AuthTypeEnum = new GraphQLEnumType({
	name: 'AuthTypeEnum',
	values: {
		FACEBOOK: {
			value: 'FACEBOOK',
		},
		GOOGLE: {
			value: 'GOOGLE',
		},
		PASSWORD: {
			value: 'PASSWORD',
		},
	},
});
