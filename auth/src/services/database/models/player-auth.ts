import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

export interface PlayerAuthModelCreateArgs {
	playerId: number;
	authId: number;
}

export interface PlayerAuthModelAttributes {
	id: number;
	playerId: number;
	authId: number;
}
// TODO need to make migratio to add created at fields to these tables
export class PlayerAuthModel {
	static create = async ({ playerId, authId }: PlayerAuthModelCreateArgs, client: PoolClient) => {
		const createQuery = `
			insert into player_auth
				(
					player_id,
					auth_id
				)
			values 
				(
					$1,
					$2
				)
			returning 
					id,
					player_id as playerId,
					auth_id as authId
		`;

		const response = await client.query<ModelCreateAttributes<PlayerAuthModelAttributes>>(
			createQuery,
			[playerId, authId]
		);

		const result = response.rows[0];

		return result;
	};
}
