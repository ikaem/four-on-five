import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface TeamPlayerRoleModelCreateArgs {
	teamId: number;
	playerId: number;
	// TODO this will be an enum
	role: string;
}

export interface TeamPlayerRoleModelAttributes {
	id: number;
	teamId: number;
	playerId: number;
	role: string;
}
// TODO need to make migratio to add created at fields to these tables
export class TeamPlayerRoleModel {
	static create = async (
		{ playerId, teamId, role }: TeamPlayerRoleModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into team_player_roles
				(
					team_id,
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
					team_id as teamId,
					player_id as playerId,
					role
		`;

		const response = await client.query<ModelCreateAttributes<TeamPlayerRoleModelAttributes>>(
			createQuery,
			[teamId, playerId, role]
		);

		const result = response.rows[0];

		return result;
	};
}
