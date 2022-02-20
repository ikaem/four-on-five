import { PoolClient } from 'pg';

export interface TeamAttributes {
	id: number;
	// TODO this is probably not needed
	// TODO this will be a bitch with seeding
	creatorId: number;
	team_name: string;
	createdAt: string;
	editedAt: string;
}

export interface TeamCreateArgs {
	creatorId: number;
	teamName: string;
}

export class Team {
	static createTeam = async (
		{ creatorId, teamName }: TeamCreateArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<TeamAttributes> => {
		const createTeamQuery = `
      insert into team
        (
          creator_id,
          team_name
        )
      values 
        (
          $1,
          $2
        )
      returning 
          id,
					creator_id as creatorId,
          team_name as teamName,
					created_at as createdAt,
          edited_at as editedAt
    `;

		const response = await client.query<TeamAttributes>(createTeamQuery, [creatorId, teamName]);

		return response.rows[0];
	};
}
