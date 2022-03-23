import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface TeamModelCreateArgs {
	teamName: string;
}

export interface TeamModelAttributes {
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

	// TODO there probably wont be any limit here? bc how to limit teams on a match? possibly though, sure...
	static getForMatches = async (
		{ matchIds, limit = null }: TeamModelGetForMatchesArgs,
		client: PoolClient
	) => {
		const getForMatchesQuery = `
			select
				t.id,
				t.team_name as "teamName",
				t.created_at as "createdAt",
				t.edited_at as "editedAt" 
			from
				team t
			join match_team mt on
				t.id = mt.team_id
			join "match" m on
				mt.match_id = m.id
			where
				m.id = any($1)
			group by 
				t.id,
				t.team_name,
				t.created_at,
				t.edited_at 
			limit $2
		`;

		const response = await client.query<TeamModelAttributes>(getForMatchesQuery, [matchIds, limit]);

		return response.rows;
	};
}
