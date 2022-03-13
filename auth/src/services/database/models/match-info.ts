import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface MatchInfoModelAttributes {
	id: number;
	matchId: number;
}

export interface MatchInfoModelCreateArgs {
	matchId: number;
}

export class MatchStatsModel {
	static create = async (
		{ matchId }: MatchInfoModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into match_info
        (
					match_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					match_id as "matchId"
    `;

		const response = await client.query<ModelCreateAttributes<MatchInfoModelAttributes>>(
			createQuery,
			[matchId]
		);

		return response.rows[0];
	};
}
