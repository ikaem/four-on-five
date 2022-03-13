import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface MatchTeamModelCreateArgs {
	matchId: number;
	teamId: number;
}

export interface MatchTeamModelAttributes {
	id: number;
	matchId: number;
	teamId: number;
}

export interface MatchTeamModelGetAllArgs {
	limit: number;
}

export interface MatchTeamModelGetAllForMatchesArgs {
	matchIds: number[];
	limit: number;
}

// TODO need to make migratio to add created at fields to these tables
export class MatchTeamModel {
	static create = async ({ teamId, matchId }: MatchTeamModelCreateArgs, client: PoolClient) => {
		const createQuery = `
			insert into match_team
				(
					match_id,
					team_id
				)
			values 
				(
					$1,
					$2
				)
			returning 
					id,
					match_id as matchId,
					team_id as teamId
		`;

		const response = await client.query<ModelCreateAttributes<MatchTeamModelAttributes>>(
			createQuery,
			[matchId, teamId]
		);

		const result = response.rows[0];

		return result;
	};

	// TODO might not even be need for production
	static getAll = async ({ limit }: MatchTeamModelGetAllArgs, client: PoolClient) => {
		const getAllQuery = `
			select 
				id,
				match_id as "matchId",
				team_id as "teamId",
			from match_team
			limit $1
		`;

		const response = await client.query<MatchTeamModelAttributes>(getAllQuery, [limit]);

		return response.rows;
	};

	static getAllForMatches = async (
		{ matchIds, limit }: MatchTeamModelGetAllForMatchesArgs,
		client: PoolClient
	) => {
		const getAllForMatchesQuery = `
			select 
				id,
				match_id as "matchId",
				team_id as "teamId"
			from match_team
			where match_id = any($1)
			limit $2
		`;

		const response = await client.query<MatchTeamModelAttributes>(getAllForMatchesQuery, [
			matchIds,
			limit,
		]);

		return response.rows;
	};
}
