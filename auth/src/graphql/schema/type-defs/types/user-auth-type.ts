import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// TODO would be great if this can get integrated in that type down there
export interface UserAuth {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	// accessToken: string;
}

// TODO this is is a regular type
// TODO move this somewhere
export interface AuthTokenPayload {
	accessToken: string;
}

export type UserAuthResponse = UserAuth & AuthTokenPayload;

export const UserAuthType = new GraphQLObjectType({
	name: 'UserAuth',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
		},
		firstName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		lastName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		email: {
			type: new GraphQLNonNull(GraphQLString),
		},
		accessToken: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
});
