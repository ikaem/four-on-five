import { PoolClient } from 'pg';
import { PoolQuery } from '../db';

export interface PlayerAttributes {
	id: number;
	authId: number;
	firstName: string;
	lastName: string;
	nick: string;
	avatarUrl: string;
	createdAt: string;
	editedAt: string;
}

export interface PlayerCreateArgs {
	authId: number;
	firstName: string;
	lastName: string;
	nick?: string;
	avatarUrl?: string;
}

export class Player {
	static createPlayer = async (
		{
			authId,
			firstName,
			lastName,
			nick = '',
			avatarUrl = 'link to some generic avatar',
		}: PlayerCreateArgs,
		client: PoolClient
	): Promise<PlayerAttributes> => {
		const createPlayerQuery = `
      insert into players
        (
          auth_id,
          first_name,
          last_name,
          nick,
          avatar_url
        )
      values 
        (
          $1,
          $2,
          $3,
          $4,
          $5
        )
      returning 
          id,
          auth_id as authId,
          first_name as firstName,
          last_name as lastName,
          nick,
          avatar_url as avatarUrl,
          created_at as createdAt,
          edited_at as editedAt
    `;

		const response = await client.query<PlayerAttributes>(createPlayerQuery, [
			authId,
			firstName,
			lastName,
			nick,
			avatarUrl,
		]);

		return response.rows[0];
	};

	static getUsers = (makeQuery: PoolQuery) => {
		return [];
	};
}
