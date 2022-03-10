import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface TeamStatsModelAttributes {
	id: number;
	teamId: number;
}

export interface TeamStatsModelCreateArgs {
	teamId: number;
}

export class TeamStatsModel {
	static create = async (
		{ teamId }: TeamStatsModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into team_stats
        (
					team_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					team_id as teamId
    `;

		const response = await client.query<ModelCreateAttributes<TeamStatsModelAttributes>>(
			createQuery,
			[teamId]
		);

		return response.rows[0];
	};
}
