import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface MatchStatsModelAttributes {
	id: number;
	matchId: number;
}

export interface MatchStatsModelCreateArgs {
	matchId: number;
}

export class MatchStatsModel {
	static create = async (
		{ matchId }: MatchStatsModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into match_stats
        (
					match_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					match_id as matchId
    `;

		const response = await client.query<ModelCreateAttributes<MatchStatsModelAttributes>>(
			createQuery,
			[matchId]
		);

		return response.rows[0];
	};
}
