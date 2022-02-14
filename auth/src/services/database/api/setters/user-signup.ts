import { PoolGetClient } from '../../db';
import { AuthType } from '../../models/auth';

export interface UserSignupArgs {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	authType: AuthType;
}

export const userSignup =
	(getClient: PoolGetClient) =>
	async ({ firstName, lastName, email, password, authType }: UserSignupArgs) => {
		const client = await getClient();
		// TODO there should be transaction here

		// TODO temp
		return {
			id: 1,
			firstName: 'test',
			lastName: 'test',
			email: 'test',
		};
	};
