import { PoolClient } from 'pg';

export interface PlayerMatchParticipationAttributes {
	id: number;
	playerId: number;
	matchId: number;
	teamId: number;
	createdAt: string;
	editedAt: string;
}

export interface PlayerMatchParticipationCreateArgs {
	playerId: number;
	matchId: number;
	// TODO optional
	teamId?: number;
}

export class PlayerMatchParticipation {
	static createMatchStats = async (
		{ playerId, matchId, teamId }: PlayerMatchParticipationCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<PlayerMatchParticipationAttributes> => {
		const createPlayerMatchParticipationQuery = `
      insert into player_match_participations
        (
					player_id,
					match_id,
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
					player_id as playerId,
					match_id as matchId,
					team_id as teamId,
					created_at as createdAt,
					edited_at as editedAt
    `;

		const response = await client.query<PlayerMatchParticipationAttributes>(
			createPlayerMatchParticipationQuery,
			[playerId, matchId, teamId]
		);

		return response.rows[0];
	};
}
