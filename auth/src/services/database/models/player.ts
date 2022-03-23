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

export interface PlayerModelGetForMatchesArgs {
	matchIds: readonly number[];
	// TODO not sure if i need this
	limit: number | null;
}

export class PlayerModel {
	static create = async (
		{ firstName, lastName, nick, avatarUrl }: PlayerModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
		insert into player
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
				first_name as "firstName",
				last_name as "lastName",
				nick,
				avatar_url as "avatarUrl",
				created_at as "createdAt",
				edited_at as "editedAt"
			from player
		`;

		const response = await client.query<PlayerModelAttributes>(getAllQuery);

		return response.rows;
	};

	static getForMatches = async (
		{ matchIds, limit = null }: PlayerModelGetForMatchesArgs,
		client: PoolClient
	) => {
		const getForMatchesQuery = `
			select 
				p.id,
				p.first_name as "firstName",
				p.last_name as "lastName",
				p.nick,
				p.avatar_url as "avatarUrl",
				p.created_at as "createdAt" ,
				p.edited_at as "editedAt"
			from 
				player p 
			join 
				match_player_team mpt on p.id = mpt.player_id 
			join "match" m on mpt.match_id = m.id
			where
				m.id = any($1);
		`;

		const response = await client.query<PlayerModelAttributes>(getForMatchesQuery, [
			matchIds,
			limit,
		]);

		return response.rows;
	};
}
