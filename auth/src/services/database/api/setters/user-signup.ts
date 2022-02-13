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
	};
