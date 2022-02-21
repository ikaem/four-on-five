import { PoolClient } from 'pg';

export interface MatchStatsAttributes {
	id: number;
	matchId: number;
	team1Score: number;
	team2Score: number;
	editedAt: string;
}

export interface MatchStatsCreateArgs {
	matchId: number;
	// TODO this could maybe be renamed to acocunt for update too
}

export class MatchStatus {
	static createMatchStats = async (
		{ matchId }: MatchStatsCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<MatchStatsAttributes> => {
		const createMatchStatsQuery = `
      insert into match_stats
        (
					match_id
        )
      values 
        (
          $1,
        )
      returning 
					id,
					match_id as matchId,
					team_1_score as team1Score,
					team_2_score as team2Score,
					edited_at as editedAt
    `;

		const response = await client.query<MatchStatsAttributes>(createMatchStatsQuery, [matchId]);

		return response.rows[0];
	};
}
