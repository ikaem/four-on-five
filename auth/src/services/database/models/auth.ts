import { PoolClient } from 'pg';

export interface AuthAttributes {
	id: number;
	email: string;
	password: string;
	// TODO this will eventually be an enum actually
	authType: string;
	createdAt: string;
	editedAt: string;
	// TODO note sure if both edited at and last login are needed
	lastLogin: string;
}

export interface CreateAuthArgs {
	email: string;
	password?: string;
	// TODO will be enum eventually
	authType: string;
}

export class Auth {
	static createAuth = async (
		{ email, password = '', authType }: CreateAuthArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<AuthAttributes> => {
		const createAuthQuery = `
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
          id,
					email,
          created_at as createdAt,
          edited_at as editedAt,
					last_login as lastLogin
    `;

		const response = await client.query<AuthAttributes>(createAuthQuery, [
			email,
			password,
			authType,
		]);

		return response.rows[0];
	};
}
