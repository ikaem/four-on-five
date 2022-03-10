import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface PlayerModelCreateArgs {
	firstName: string;
	lastName: string;
	nick: string;
	avatarUrl: string;
}

interface PlayerModelAttributes {
	id: number;
	firstName: string;
	lastName: string;
	nick: string;
	avatarUrl: string;
	createdAt: string;
	editedAt: string;
}

export class PlayerModel {
	static create = async (
		{ firstName, lastName, nick, avatarUrl }: PlayerModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
		insert into players
			(
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
				$4
			)
		returning 
			id
	`;

		const response = await client.query<ModelCreateAttributes<PlayerModelAttributes>>(createQuery, [
			firstName,
			lastName,
			nick,
			avatarUrl,
		]);

		return response.rows[0];
	};

	// TODO this is temp, jsut for seed for now
	// actual client has to be passed in, not the query
	static getAll = async (client: PoolClient) => {
		const getAllQuery = `
			select 
				id,
				first_name as firstName,
				last_name as lastName,
				nick,
				avatar_url as avatarUrl,
				created_at as createdAt,
				edited_at as editedAt
			from players
		`;

		const response = await client.query<PlayerModelAttributes>(getAllQuery);

		return response.rows;
	};

	// maybe letter for some else
	// so whatever is for, this is what we are passing ids of
	static getAllForMatches = async () => {
		// this goes get all players for matches ids
		// get all players
		// join match-team-player on mtp.player id = player id
		// join match-team on mt.id = mtp.match_team_id
		// join match on m.id = mt.match_id
		// where m.id = any(matchids)
		//
	};

	// TODO this is for getting all players
	// TODO later this should be paginated
	// TODO maybe even if no player ids is passed, we just get all players
	// static getPlayers = async (client: PoolClient) => {
	// 	const getPlayersQuery = `
	// 		select
	// 			id,
	// 			auth_id as authId,
	// 			first_name as firstName,
	// 			last_name as lastName,
	// 			nick,
	// 			avatar_url as avatarUrl,
	// 			created_at as createdAt,
	// 			edited_at as editedAt
	// 		from players
	// 	`;

	// 	const response = await client.query<PlayerAttributes>(getPlayersQuery);

	// 	return response.rows;
	// };

	// // TODO for future
	// // loader before us will get us ids of players and we will just get those players - id does not matter where and from here, to join or anyhting  - just where any
	// // so we just need ids here
	// // static getPlayersThatbelongToWhatverGroup (playerIds: number[])

	// static getUsers = (makeQuery: PoolQuery) => {
	// 	return [];
	// };
}
