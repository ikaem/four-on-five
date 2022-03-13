import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface TeamInfoModelAttributes {
	id: number;
	teamId: number;
}

export interface TeamInfoModelCreateArgs {
	teamId: number;
}

export class TeamInfoModel {
	static create = async (
		{ teamId }: TeamInfoModelCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	) => {
		const createQuery = `
      insert into team_info
        (
					team_id
        )
      values 
        (
          $1
        )
      returning 
					id,
					team_id as "teamId"
    `;

		const response = await client.query<ModelCreateAttributes<TeamInfoModelAttributes>>(
			createQuery,
			[teamId]
		);

		return response.rows[0];
	};
}
