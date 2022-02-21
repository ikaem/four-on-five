import { PoolClient } from 'pg';

export interface TeamAttributes {
	id: number;
	// TODO this is probably not needed
	// TODO this will be a bitch with seeding
	// TODO this is actually ok for now
	creatorId: number;
	teamName: string;
	createdAt: string;
	editedAt: string;
}

export interface CreateTeamArgs {
	creatorId: number;
	teamName: string;
}

export interface GetTeamsArgs {
	// TODO this is for later, when add loader
	// teamIds: number[]
	limit: number;
}

export class Team {
	static createTeam = async (
		{ creatorId, teamName }: CreateTeamArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<TeamAttributes> => {
		const createTeamQuery = `
      insert into teams
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

	// TODO this is for getting all players
	// TODO later this should be paginated
	// TODO maybe even if no player ids is passed, we just get all players
	static getTeams = async ({ limit }: GetTeamsArgs, client: PoolClient) => {
		const getTeamsQuery = `
			select 
				id,
				creator_id as creatorId,
				team_name as teamName,
				created_at as createdAt,
				edited_at as editedAt
			from teams
			limit $1
		`;

		const response = await client.query<TeamAttributes>(getTeamsQuery, [limit]);

		return response.rows;
	};
}
