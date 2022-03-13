import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface PlayerInfoModelAttributes {
	id: number;
	playerId: number;
}

export interface PlayerInfoModelCreateArgs {
	playerId: number;
}

export class PlayerInfoModel {
	static create = async (
		{ playerId }: PlayerInfoModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into player_info
        (
					player_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					player_id as "playerId"
    `;

		const response = await client.query<ModelCreateAttributes<PlayerInfoModelAttributes>>(
			createQuery,
			[playerId]
		);

		return response.rows[0];
	};
}
