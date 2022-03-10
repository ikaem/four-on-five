import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface MatchPlayerModelCreateArgs {
	matchId: number;
	playerId: number;
	// make this defgault of null
	matchTeamId: number | null;
}

export interface MatchPlayerModelAttributes {
	id: number;
	matchId: number;
	playerId: number;
	matchTeamId: number | null;
}
// TODO need to make migratio to add created at fields to these tables
export class MatchPlayerModel {
	static create = async (
		{ matchId, playerId, matchTeamId = null }: MatchPlayerModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into match_players
				(
					match_id,
					player_id,
					match_team_id
				)
			values 
				(
					$1,
					$2,
					$3
				)
			returning 
					id,
					match_id as matchId,
					player_id as playerId,
					match_team_id as matchTeamId
		`;

		const response = await client.query<ModelCreateAttributes<MatchPlayerModelAttributes>>(
			createQuery,
			[matchId, playerId, matchTeamId]
		);

		const result = response.rows[0];

		return result;
	};
}
