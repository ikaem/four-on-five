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

export interface CreatePlayerArgs {
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
		}: CreatePlayerArgs,
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

	// TODO this is for getting all players
	// TODO later this should be paginated
	// TODO maybe even if no player ids is passed, we just get all players
	static getPlayers = async (client: PoolClient) => {
		const getPlayersQuery = `
			select 
				id,
				auth_id as authId,
				first_name as firstName,
				last_name as lastName,
				nick,
				avatar_url as avatarUrl,
				created_at as createdAt,
				edited_at as editedAt
			from players
		`;

		const response = await client.query<PlayerAttributes>(getPlayersQuery);

		return response.rows;
	};

	// TODO for future
	// loader before us will get us ids of players and we will just get those players - id does not matter where and from here, to join or anyhting  - just where any
	// so we just need ids here
	// static getPlayersThatbelongToWhatverGroup (playerIds: number[])

	static getUsers = (makeQuery: PoolQuery) => {
		return [];
	};
}
