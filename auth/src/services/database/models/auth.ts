import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface AuthModelCreateArgs {
	email: string;
	password: string | null;
	// this has to be an enum
	authType: string;
}

interface AuthModelAttributes {
	id: number;
	email: string;
	authType: string;
	createdAt: string;
	editedAt: string;
	lastLogin: string;
}

export class AuthModel {
	static create = async (
		{ email, password, authType }: AuthModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into auth
				(
					email,
					password,
					auth_type
				)
			values 
				(
					$1,
					$2,
					$3
				)
			returning 
				id
		`;

		const response = await client.query<ModelCreateAttributes<AuthModelAttributes>>(createQuery, [
			email,
			password,
			authType,
		]);

		const result = response.rows[0];

		return result;
	};
}
