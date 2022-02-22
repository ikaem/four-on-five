import { PoolClient } from 'pg';

export interface MatchStatsAttributes {
	id: number;
	matchId: number;
	team1Score: number;
	team2Score: number;
	editedAt: string;
}

export interface CreateMatchStatsArgs {
	matchId: number;
	// TODO these are optional, in case we are creating a match after it was finished
	team1Score: number | null;
	team2Score: number | null;
	// TODO this could maybe be renamed to acocunt for update too
}

export class MatchStats {
	static createMatchStats = async (
		{ matchId, team1Score = null, team2Score = null }: CreateMatchStatsArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<MatchStatsAttributes> => {
		const createMatchStatsQuery = `
      insert into match_stats
        (
					match_id,
					team_1_score,
					team_2_score
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
					team_1_score as team1Score,
					team_2_score as team2Score,
					edited_at as editedAt
    `;

		const response = await client.query<MatchStatsAttributes>(createMatchStatsQuery, [
			matchId,
			team1Score,
			team2Score,
		]);

		return response.rows[0];
	};
}
