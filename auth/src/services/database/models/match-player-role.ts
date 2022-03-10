import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface MatchPlayerRoleModelCreateArgs {
	matchId: number;
	playerId: number;
	// TODO this will be an enum
	role: string;
}

export interface MatchPlayerRoleModelAttributes {
	id: number;
	matchId: number;
	playerId: number;
	role: string;
}
// TODO need to make migratio to add created at fields to these tables
export class MatchPlayerRoleModel {
	static create = async (
		{ matchId, playerId, role }: MatchPlayerRoleModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into match_player_roles
				(
					match_id,
					player_id,
					role
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
					role
		`;

		const response = await client.query<ModelCreateAttributes<MatchPlayerRoleModelAttributes>>(
			createQuery,
			[matchId, playerId, role]
		);

		const result = response.rows[0];

		return result;
	};
}
