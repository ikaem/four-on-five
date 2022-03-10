import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface PlayerStatsModelAttributes {
	id: number;
	playerId: number;
}

export interface PlayerStatsModelCreateArgs {
	playerId: number;
}

export class PlayerStatsModel {
	static create = async (
		{ playerId }: PlayerStatsModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into player_stats
        (
					player_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					player_id as playerId
    `;

		const response = await client.query<ModelCreateAttributes<PlayerStatsModelAttributes>>(
			createQuery,
			[playerId]
		);

		return response.rows[0];
	};
}
