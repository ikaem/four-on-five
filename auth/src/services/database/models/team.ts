import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface TeamModelCreateArgs {
	teamName: string;
}

interface TeamModelAttributes {
	id: number;
	teamName: string;
	createdAt: string;
	editedAt: string;
}

export interface TeamModelGetAllArgs {
	limit: number;
}

export interface TeamModelGetForMatchesArgs {
	matchIds: readonly number[];
	// TODO not sure if i need this
	limit: number | null;
}

export class TeamModel {
	static create = async ({ teamName }: TeamModelCreateArgs, client: PoolClient) => {
		const createQuery = `
			insert into team
				(
					team_name
				)
			values 
				(
					$1
				)
			returning 
				id
		`;

		const response = await client.query<ModelCreateAttributes<TeamModelAttributes>>(createQuery, [
			teamName,
		]);

		const result = response.rows[0];

		return result;
	};

	static getAll = async ({ limit }: TeamModelGetAllArgs, client: PoolClient) => {
		const getAllQuery = `
			select 
				id,
				team_name as "teamName",
				created_at as "createdAt",
				edited_at as "editedAt"
			from team
			limit $1
		`;

		const response = await client.query<TeamModelAttributes>(getAllQuery, [limit]);

		return response.rows;
	};

	static getForMatches = async({});

	// TODO this is for getting all players
	// TODO later this should be paginated
	// // TODO maybe even if no player ids is passed, we just get all players
	// static getTeams = async ({ limit }: GetTeamsArgs, client: PoolClient) => {
	// 	const getTeamsQuery = `
	// 		select
	// 			id,
	// 			creator_id as creatorId,
	// 			team_name as teamName,
	// 			created_at as createdAt,
	// 			edited_at as editedAt
	// 		from teams
	// 		limit $1
	// 	`;

	// 	const response = await client.query<TeamAttributes>(getTeamsQuery, [limit]);

	// 	return response.rows;
	// };
}
