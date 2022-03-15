import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface MatchPlayerTeamModelCreateArgs {
	matchId: number;
	playerId: number;
	// make this defgault of null
	teamId: number | null;
}

export interface MatchPlayerTeamModelGetAllForMatchesArgs {
	matchIds: readonly number[];
	limit: number | null;
}

export interface MatchPlayerTeamModelAttributes {
	id: number;
	matchId: number;
	playerId: number;
	teamId: number | null;
}

// TODO need to make migratio to add created at fields to these tables
export class MatchPlayerTeamModel {
	static create = async (
		{ matchId, playerId, teamId = null }: MatchPlayerTeamModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into match_player_team
				(
					match_id,
					player_id,
					team_id
				)
			values 
				(
					$1,
					$2,
					$3
				)
			returning 
					id,
					match_id as "matchId",
					player_id as "playerId",
					team_id as "teamId"
		`;

		const response = await client.query<ModelCreateAttributes<MatchPlayerTeamModelAttributes>>(
			createQuery,
			[matchId, playerId, teamId]
		);

		const result = response.rows[0];

		return result;
	};

	static getAllForMatches = async (
		{ matchIds, limit }: MatchPlayerTeamModelGetAllForMatchesArgs,
		client: PoolClient
	) => {
		const getAllForMatchesQuery = `
			select 
				id,
				match_id as "matchId",
				player_id as "playerId",
				team_id as "teamId"
			from match_player_team
			where match_id = any($1)
			limit $2
		`;

		const response = await client.query<MatchPlayerTeamModelAttributes>(getAllForMatchesQuery, [
			matchIds,
			limit,
		]);

		return response.rows;
	};
}
